
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors')

const bodyParser = require('body-parser')
const controllers = require('./controllers')
const fs = require('fs')
const { readdirSync, rename } = require('fs');
const moment = require('moment')

const app = express()
app.use(cors());
const port = 3333

// var files = fs.readdirSync('C:/Users/gusla/Downloads/PALAVRAS INVENTADAS VIDEO-20220303T113634Z-001/PALAVRAS INVENTADAS VIDEO')

// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, "127.0.0.1");
// console.log('Server running at http://127.0.0.1:1337/');

// console.log(files)

// let words = []

// for(let file of files) {
//   const newFileName = file.split(".")
//   words.push(newFileName[0])
// }

// console.log(words)

// const words = [
//   'apomé',    'babonha', 'béz',
//   'crá',      'dem',     'flô',
//   'fogata',   'féqui',   'gar',
//   'gipada',   'glabu',   'jar',
//   'lemo',     'maquero', 'maqués',
//   'mépa',     'pamoca',  'pepivunha',
//   'poqui',    'péfa',    'ramilha',
//   'ropi',     'supi',    'suteca',
//   'tapapina', 'vum'
// ]

// const files = fs.readdirSync("C:/Users/gusla/OneDrive/Documentos/icaf/icaf_frontend/public/assets/audio/words")

// for (const [index, value] of files.entries()) {
//   const newFileName = value.split(" ")
// //   words.push(newFileName[0])
//   const path = "C:/Users/gusla/OneDrive/Documentos/icaf/icaf_frontend/public/assets/audio/words/"+value

//   const newPath = "C:/Users/gusla/OneDrive/Documentos/icaf/icaf_frontend/public/assets/audio/words/"+newFileName[0]+".wav"
//   rename(
//     path,
//     newPath,
//     err => console.log(err)
//   )
// }


app.use(bodyParser.json())

app.get('/', (req, res) => res.status(200).json({ hello: 'world!' }))

app.use('/users', controllers.users)
app.use('/words', controllers.words)
app.use('/transcriptions', controllers.transcriptions)
app.use('/tests', controllers.tests)
app.use('/results', controllers.results)
app.use('/pseudowords', controllers.pseudoWords)


app.use('/', express.static('public'));
app.use(fileUpload());

// Rota para envio do áudio
app.post('/upload', (req, res) => {    
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  const myFile = req.files.file;

  const { username, word, test, wordId, testType } = req.body

  console.log(req.body)

  /**const userDir = `./public/users/${username}`

  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true })
  } */

  const dir = `./public/users/${username}/${testType}/test_${test}`

  if(!fs.existsSync(dir)) {
    console.log('aaaaaaa')
    fs.mkdirSync(dir, { recursive: true })
  }

  myFile.mv(`${__dirname}/public/users/${username}/${testType}/test_${test}/${word}.mp3`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send(
        {
          status: "Error while saving file",
          error: err
        });
    }

    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });
})



app.listen(port, () => console.log(`App running on port ${port}`))
