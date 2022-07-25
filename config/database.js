const mongoose = require('mongoose'); //IMPORT MONGOOSe
mongoose.Promise = global.Promise; //INICIAMOS O MONGOOSE 

//Conectando o mongoose
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log("Conectado o ao MONGO"))
.catch((err) => console.log("ERRO", err));
