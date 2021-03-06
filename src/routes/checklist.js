const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

router.get('/', (req, res) => {
  console.log("Hello World");
  res.send();
});

router.post('/', async (req, res) => {
  let { name } = req.body;

  try{
    let checklist = await Checklist.create({ name })
    res.status(200).json(checklist);
  }catch(error){
    res.status(422).json(error);
    console.log("error", error)
  }

});

router.get('/:id', (req, res) => {
  console.log(req.body["name"]);
  res.send(`ID: ${req.params.id}`);
})

module.exports = router;