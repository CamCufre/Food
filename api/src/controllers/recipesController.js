require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const {Recipes, Diets, Diet_Recipes} = require('../db');
const {Op, where} = require('sequelize');
const results = require('../apiQlia')

//?apiKey=
// Para separar las querys se usa ? y & (solo si ya hay un ? antes)
//---------------------------------------------------------------------------//
// -  Esta ruta obtiene el detalle de una receta específica. Es decir que devuelve un objeto con la información pedida en el detalle de una receta.
// -  La receta es recibida por parámetro (ID).
// -  Tiene que incluir los datos de los tipos de dietas asociados a la receta.
// -  Debe funcionar tanto para las recetas de la API como para las de la base de datos.

const getRecipeById = async (req, res) => {
  try {

    const { id } = req.params;

const checkRecipesDB = await Recipes.findByPk(id, {
  attributes: ['id', 'name', 'image', 'description', 'healthscore', 'steps', 'created'],
});

if (checkRecipesDB) {
  const findDiets = await Diet_Recipes.findAll({
    where: { recipeId: id },
    attributes: ['dietId'],
  });

  const dietIds = findDiets.map(diet => diet.dietId);

  const diets = await Diets.findAll({
    where: { id: dietIds },
    attributes: ['name'],
  });

  const formattedDiets = diets.map(diet => diet.name);

  const receta = {
    ...checkRecipesDB.toJSON(),
    diets: formattedDiets.join(', '),
  };

  const array = [receta]

  return res.json(array);
    };

    /////////////////////////////API////////////////////////////////

    // const {data} = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`);

    // if(!data && checkRecipesDB)return res.status(400).send(`Results not found by requested ID ${id}.`)

    // const filteredRecipes = data

    // const deleteTags = filteredRecipes.summary.replace(/<[^>]*>/g, '');

    // const stepsBystep = data.analyzedInstructions[0].steps.map(step => step.step)

    // const associatedDiet = {
    //   id: filteredRecipes.id,
    //   name: filteredRecipes.title,
    //   image: filteredRecipes.image, //comentalo pa usar el json
    //   description: deleteTags,
    //   healthScore: filteredRecipes.healthScore,
    //   steps: stepsBystep.map((step, index) => `${index + 1}. ${step}`),
    //   diets: filteredRecipes.diets.join(', ')
    // }

    // return res.status(200).json(associatedDiet);

    ////////////////////////////////JSON////////////////////////////
    
    const data = results.filter(data => data.id == id);

    const result = data.map(recipe =>{
    return{
      id: recipe.id,
      name: recipe.title,
      image: recipe.image,
      description: recipe.summary.replace(/<[^>]*>/g, ''),
      steps: recipe.analyzedInstructions[0].steps.map(step => step.step).map((step, index) => `${index + 1}. ${step}`),
      healthscore: recipe.healthScore,
      diets: recipe.diets.join(', ')
      }
    })

    return res.status(200).json(result)

    ////////////////////////////////////////////////////////////////
    
 } catch (error) {
    
    return res.status(404).json('Results not found by requested ID')
 }

}

//---------------------------------------------------------------------------//
// -  Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// -  Debe poder buscarla independientemente de mayúsculas o minúsculas.
// -  Si no existe la receta, debe mostrar un mensaje adecuado.
// -  Debe buscar tanto las de la API como las de la base de datos.

const getRecipeByName = async (req, res) => {
  try {
    const { name } = req.query;

    const checkRecipesDB = await Recipes.findAll({
      where: {
        name: {
          [Op.substring]: name,
        },
      },
      attributes: ['id', 'name', 'image', 'description', 'healthscore', 'steps', 'created']
    });

    const findDiets = await Promise.all(checkRecipesDB.map(async (recipe) => {
      const recipeDietIds = await Diet_Recipes.findAll({
        where: {
          recipeId: recipe.id
        },
        attributes: ['dietId']
      });
    
      const recipeDiets = await Promise.all(recipeDietIds.map(async (id) => {
        const diet = await Diets.findByPk(id.dietId, {
          attributes: ['name']
        });
        return diet.name;
      }));
    
      return {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        description: recipe.description,
        steps: recipe.steps,
        healthscore: recipe.healthscore,
        diets: recipeDiets,
        created: true
      };
    }));
//////////////////////////////////API////////////////////////////////////////
    // const checkRecipeAPI = await axios(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${name}`
    // );

    // const getResults = [
    //   ...findDiets,
    //   ...checkRecipeAPI.data.results.map((recipe) => {
    //     return {
    //       id: recipe.id,
    //       name: recipe.title,
    //       image: recipe.image,
    //       description: recipe.summary.replace(/<[^>]*>/g, ''),
    //       steps: recipe.analyzedInstructions[0].steps.map((step) => step.step).map((step, index) => `${index + 1}. ${step}`),
    //       healthscore: recipe.healthScore,
    //       diets: recipe.diets.join(', '),
    //       created: false,
    //     };
    //   }),
    // ];

//////////////////////////////////JSON////////////////////////////////////////

const checkRecipeAPI = results.filter((recipe) => recipe.title.toLowerCase().includes(name))

console.log(checkRecipeAPI)

const getResults = [
  ...findDiets,
  ...checkRecipeAPI.map((recipe) => {
        return {
          id: recipe.id,
          name: recipe.title,
          image: recipe.image,
          description: recipe.summary.replace(/<[^>]*>/g, ''),
          steps: recipe.analyzedInstructions[0].steps.map((step) => step.step).map((step, index) => `${index + 1}. ${step}`),
          healthscore: recipe.healthScore,
          diets: recipe.diets.join(', '),
          created: false,
        };
      })
]

//////////////////////////////////////////////////////////////////////////////

    res.status(200).json(getResults);
  } catch (error) {
    res.status(404).send('Results not found with requested name.');
  }
};

const postRecipe = async (req, res) => {
  try {
    const { name, image, description, healthscore, steps, diets } = req.body;

    const newRecipe = await Recipes.create({
      name,
      description,
      healthscore,
      image,
      steps,
      created: true
    });

    const dietRecords = await Promise.all(
      diets.map(async (diet) => {
        const [newDiet] = await Diets.findOrCreate({
          where: { name: diet },
          defaults: { name: diet }
        });

        await Diet_Recipes.create({
          recipeId: newRecipe.id,
          dietId: newDiet.id
        });

        return newDiet;
      })
    );

    res.status(200).json({ message: 'Recipe created successfully.', newRecipe, diets: dietRecords });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};


//RECETAS DE LA HOMEPAGE RANDOM

//La idea es traer recetas 100 recetas random de la API
//https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true

const getRecipes = async (req, res) => {
  try {
    // Obtener las recetas de la base de datos
    const dbRecipes = await Recipes.findAll({
      attributes: ['id', 'name', 'image', 'healthscore', 'created'] // atributos deseados
    });

    const findDiets = await Promise.all(dbRecipes.map(async (recipe) => {
      const recipeDietIds = await Diet_Recipes.findAll({
        where: {
          recipeId: recipe.id
        },
        attributes: ['dietId']
      });
    
      const recipeDiets = await Promise.all(recipeDietIds.map(async (id) => {
        const diet = await Diets.findByPk(id.dietId, {
          attributes: ['name']
        });
        return diet.name;
      }));
    
      return {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        healthscore: recipe.healthscore,
        diets: recipeDiets.join(', '),
        created: true
      };
    }));

  //////////////////////////////API//////////////////////////////////////

    // const results = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    // const apiRecipes = results.data.results.map(recipe => ({
    //   id: recipe.id,
    //   name: recipe.title,
    //   image: recipe.image,
    //   diets: recipe.diets.join(', '),
    //   healthscore: recipe.healthScore
    // }));

  ///////////////////////////////JSON///////////////////////////////////

  const apiRecipes = results.map(recipe => {
  return {
    id: recipe.id,
    name: recipe.title,
    image: recipe.image,
    diets: recipe.diets.join(', '),
    healthscore: recipe.healthScore
  };
  });

  //////////////////////////////////////////////////////////////////////

    // Combinar las recetas de la base de datos y las recetas de la API
    const allRecipes = [...findDiets, ...apiRecipes];

    // Devolver los resultados combinados en la respuesta
    return res.status(200).json(allRecipes);
  } catch (error) {
    // Manejar cualquier error que ocurra
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las recetas' });
  }
};

module.exports = {
    getRecipeById,
    getRecipeByName,
    postRecipe,
    getRecipes
}