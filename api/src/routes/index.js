// const { Router } = require('express');
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');

// const dietsRouter = require('../routes/dietsRouter')
// const recipesRouter = require('../routes/recipesRouter')
// const router = Router();

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);

// router.use('/diets', dietsRouter)
// router.use('/recipes', recipesRouter)

// module.exports = router;

const { Router } = require('express');
const cors = require('cors');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dietsRouter = require('../routes/dietsRouter');
const recipesRouter = require('../routes/recipesRouter');

const router = Router();

// Configurar CORS
router.use(cors());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/diets', dietsRouter);
router.use('/recipes', recipesRouter);

module.exports = router;