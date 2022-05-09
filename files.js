
  var fs = require('fs')
  var files = fs.readdirSync('C:/Users/gusla/Downloads/PALAVRAS INVENTADAS VIDEO-20220303T113634Z-001/PALAVRAS INVENTADAS VIDEO')

  var http = require('http');
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }).listen(1337, "127.0.0.1");
  console.log('Server running at http://127.0.0.1:1337/');

  console.log(files)

  let words = []

  for(let file of files) {
    const newFileName = file.split(" ")
    words.push(newFileName[0])
  }

  console.log(words)
