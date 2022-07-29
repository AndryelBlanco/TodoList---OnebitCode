const express = require('express');

const router = express.Router();

const Checklist = require('../models/checklist');

router.get('/', async (req, res) => {
  try {
    let checklist = await Checklist.find({});
    res.status(200).render('checklists/index', { checklists: checklist })
  } catch (error) {
    res.status(422).json(error);
    res.status(422).render('pages/error', {error: "Erro ao exibir listas!"});
  }
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

router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/show', { checklists: checklist })
  } catch (error) {
    console.log("error", error)
    res.status(422).json(error);
    res.status(422).render('pages/error', {error: "Erro ao exibir listas!"});
  }
})

router.put('/:id', async (req, res) => {
  let { name } = req.body;
  try {
    let checklist = await Checklist.findByIdAndUpdate(req.params.id, {name}, {new: true});
    res.status(200).json(checklist);
  } catch (error) {
    console.log("error", error)
    res.status(422).json(error);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.status(200).json(checklist);
  } catch (error) {
    console.log("error", error)
    res.status(422).json(error);
  }
})

module.exports = router;