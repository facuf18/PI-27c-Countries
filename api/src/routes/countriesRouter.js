const { Router } = require('express');
const { Country, Activity } = require('../db.js');
const setCountriesToDb = require('../utils/loadData');

const router = Router();

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    let countries = await Country.findAll({
      attributes: ['name', 'id', 'flag_img', 'continent', 'population']
    });
    if(!countries.length) {
      await setCountriesToDb();
      countries = await Country.findAll({
        attributes: ['name', 'id', 'flag_img', 'continent', 'population']
      });
    }
    if(name) {
      const country = countries.find(c => c.name.toLowerCase() === name.toLowerCase());
      res.json(country ? country : 'No country found');
    } else {
      res.json(countries.length ? countries : 'No countries found');
    }
  } catch (err) {
    res.status(404).send({ error: err });
  }
});

router.get('/:id', async (req, res) => {
  let { id } = req.params;
  id = id.toUpperCase();
  try {
    let countries = await Country.findAll({
      include: {
        model: Activity
      }
    });
    if(!countries.length) {
      await setCountriesToDb();
    }
    const country = await Country.findByPk(id, {
      include: {
        model: Activity
      }
    });
    res.json(country ? country : 'No country found');
  } catch (err) {
    res.status(404).send({ error: err });
  }
});


module.exports = router;