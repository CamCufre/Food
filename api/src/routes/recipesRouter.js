const {Router} = require('express');
const recipesRouter = Router();
const {getRecipeById, getRecipeByName, postRecipe, getRecipes} = require('../controllers/recipesController')

recipesRouter.get('/home', getRecipes)

recipesRouter.get('/:id', getRecipeById)

recipesRouter.get('/', getRecipeByName)

recipesRouter.post('/', postRecipe)

module.exports = recipesRouter