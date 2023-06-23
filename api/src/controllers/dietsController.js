require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Diets } = require('../db')
const results = require('../apiQlia')
 

// funcion que limpiará los resultados de la API
const clean = (array) => {
  return array.map((each) => {
    return {
          diets: each.diets.map((diet) => diet.trim().replace(/-+$/, "")),
    };
  });
};

//traigo de la API
const allDiets = async (req, res) => {
  try {

    ///////////////////////////////API//////////////////////////////////

    // const respuesta = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&number=100&addRecipeInformation=true`
    // );

    // const apiClean = clean(respuesta.data.results);

    ///////////////////////////////JSON///////////////////////////////////

    const apiClean = clean(results);

    ///////////////////////////////////////////////////////////////////////

    const dietSet = new Set();

    apiClean.forEach((each) => {
      each.diets.forEach((diet) => {
        dietSet.add(diet);
      });
    });

    const dietList = [...dietSet];

    for (const dietName of dietList) {
      await Diets.findOrCreate({
        where: { name: dietName },
      });
    }

    const dietsDB = await Diets.findAll();

    res.status(200).json([...dietsDB]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports= allDiets