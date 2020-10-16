//Importar biblioteca
const express = require('express');
 //Interpreta os diretórios da maneira correta de acordo com cada SO
const path = require('path');
const pages = require('./pages.js');

//Iniciando o express
const server = express();
server
  //Utilizar body do req
  .use(express.urlencoded({extended: true}))
  //Utilizando os arquivos estáticos
  .use(express.static('public'))

  //Configurar template engine
  .set('views', path.join(__dirname, "views"))
  .set('view engine', 'hbs')
  
  //Rotas da aplicação
  .get('/', pages.index)
  .get('/orphanage', pages.orphanage)
  .get('/orphanages', pages.orphanages)
  .get('/create-orphanage', pages.createOrphanage)
  .post('/save-orphanage', pages.saveOrphanage)

//Ligar o servidor
server.listen(5500);

// nodemon é responsável por perceber mudanças no server.js e reiniciá-lo sempre que houver uma
// hbs é um template engine que vamos utilizar para tornar o html "dinâmico"