const express = require('express')

const fileUpload = require('express-fileupload');
const cors = require('cors')

const bodyParser = require('body-parser')
const controllers = require('./controllers')
const fs = require('fs')
const getStat = require('util').promisify(fs.stat);
const { readdirSync, rename } = require('fs');
const moment = require('moment')

const app = express()
app.use(cors());
const port = 3333

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

  const dir = `./public/users/${username}/${testType}/test_${test}`

  if(!fs.existsSync(dir)) {
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


app.get('/audio', async (req, res) => {
  const { audio } = req.query

  const highWaterMark =  2;

  const filePath = `${__dirname}${audio}`

  const stat = await getStat(filePath);
    console.log(stat);    
    
    // informações sobre o tipo do conteúdo e o tamanho do arquivo
    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(filePath, { highWaterMark });

    // só exibe quando terminar de enviar tudo
    stream.on('end', () => console.log('acabou'));

    // faz streaming do audio 
    stream.pipe(res);
})



app.listen(process.env.PORT || 3000)
