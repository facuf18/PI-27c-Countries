const { Router } = require('express');
const { Activity } = require('../db.js');

const router = Router();
let id = 1;

router.post('/', async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  if (!name || !difficulty || !duration || !season || !countries) {
    res.status(404).send({ error: "Can't create activity" });
  }

  try {
    const verifyActivity = await Activity.findOne({
      where: {
        name: name
      }
    });
    if(verifyActivity) {
      res.status(404).send({ error: 'The activity already exists' });
    } else {
      const newActivity = await Activity.create({
        id,
        name,
        difficulty,
        duration,
        season
      })
      id++;
      const promises = countries.map(c => newActivity.addCountry(c));
      await Promise.all(promises);
      res.json(newActivity);
    }
  } catch(err) {
    res.status(404).send({ error: err });
  }
});

module.exports = router;