const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const urlParse = url.parse(req.url, true);
  const params = queryString.parse(urlParse.search);
  console.log(params);
  let resposta;

  if (urlParse.pathname == '/criar-usuario-atualizar') {
    //criar e att user
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      resposta = 'User criado/atualizado com sucesso!!!'

      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      res.end(resposta);
    });
  }
  else if (urlParse.pathname == '/selecionar-usuario') {
    //selecionar 
    fs.readFile('users/' + params.id + '.txt', function (err, data) {
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.end(data);
    });
  }
  else if (urlParse.pathname == '/remover-usuario') {
    fs.unlink('users/' + params.id + '.txt', function (err) {
      if (err) throw err;
      resposta = 'User removido!!!';

      res.statusCode = 200;
      res.setHeader('Content-type', 'text/plain');
      res.end(resposta);
    });
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('Hello World!!!');
  }

});

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}/`);
});

//http://localhost:3000/criar-usuario-atualizar?id=2&nome=Cleber&idade=90
//http://localhost:3000/selecionar-usuario?id=1