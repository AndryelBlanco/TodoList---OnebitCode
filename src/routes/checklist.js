const express = require('express');
const checklist = require('../models/checklist');

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

router.get('/new', async (req, res) => {
  try{
    let checklist = new Checklist();
    res.status(200).render('checklists/new', { checklist: checklist })
  }catch(error){
    res.status(422).json(error);
    console.log("error", error)
    res.status(422).render('pages/error', {error: "Erro ao criar tarefa!"});
  }
});

router.get('/:id/edit', async (req, res) => {
  try{
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/edit', { checklist: checklist })
  }catch(error){
    res.status(422).json(error);
    console.log("error", error)
    res.status(422).render('pages/error', {error: "Erro ao exibir página de edição!"});
  }
});

router.post('/', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({name})
  
  try{
    console.log('CHECK',req.body)
    await checklist.save();
    res.redirect('/checklist');
  }catch(error){
    res.status(422).render('checklists/new', {checklist: {...checklist, error}});
    console.log("error", error)
  }

});



router.get('/:id', async (req, res) => {
  try {
    //A gente quer que devolva as tasks associadas com essa checklist, por isso passamos o populate. Logo o mongoose vai buscar essas tasks e trazer para popular esse array de tasks
    let checklist = await Checklist.findById(req.params.id).populate('tasks'); 
    res.status(200).render('checklists/show', { checklists: checklist })
  } catch (error) {
    console.log("error", error)
    res.status(422).json(error);
    res.status(422).render('pages/error', {error: "Erro ao exibir listas!"});
  }
})

router.put('/:id', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);
  try {
    await checklist.update({name})
    res.redirect('/checklist');
  } catch (error) {
    console.log("error", error)
    let errors = error.errors;
    req.status(422).render('checklists/edit', {checklist: {...checklist, errors}})
    res.status(422).json(error);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.redirect('/checklist');
  } catch (error) {
    res.status(422).render('pages/error', {error: "Erro ao deletar lista de tarefas!"});
  }
})

module.exports = router;