const {Router} = require('express');
const dietsRouter = Router();
const allDiets = require('../controllers/dietsController')

dietsRouter.get('/', allDiets)

module.exports = dietsRouter
