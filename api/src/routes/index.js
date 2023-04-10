const { Router } = require('express');
const { createANewActivity, postActivity, getActivities } = require('../controllers/ActivityController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllCountriesAPI = require('../controllers/API-request');
const { getCountries, getCountryById } = require('../controllers/CountryController');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get('/countries', getAllCountriesAPI);
router.get('/countries', async(req, res, next)=>{
    const { name } = req.query;
    try {
      const dogsList = await getCountries(name);
      // const dogsList = await getAllDogsAPI(name);
      res.status(200).json(dogsList);
    } catch (error) {
      next(error);
    }
});

router.get('/countries/:id', async (req, res, next) =>{
  const {id} = req.params;
  try {
    const country = await getCountryById(id);
    res.status(200).json(country)
  } catch (error) {
    // res.status(404).send({msg: 'Id country not found'})
    next(error)
  }
})

router.post('/activities', postActivity);


router.get('/activities', async(req, res, next)=> {
  const {name} = req.query;
  try {
    const dbActivities = await getActivities(name);
    res.status(200).json(dbActivities)

  } catch (error) {
    next(error)
  }
})





module.exports = router;
