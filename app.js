const express = require('express');

const app = express();

app.use(express.json());

//Criando um middleware
const log = (req, res, next) => {
  console.log(req.body);
  console.log('DATE', Date.now());
  next();
}

app.use(log);

//Para criar a rota
app.get('/', (req, res) => {
  res.send('<h1>My todo list ;)</h1>');
});

app.get('/json', (req, res) => {
  // Devolver um JSON
  res.json({
    title: 'Tarefa Inicial',
    status: 'Done'
  }) 
});

//Fazemos o server ouvir a porta 3000
app.listen(3000, () => {
  console.log("SERVIDOR FOI INICIADO");
});