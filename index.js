const express = require('express')

const fileUpload = require('express-fileupload');
const cors = require('cors')
const { google } = require('googleapis')

const bodyParser = require('body-parser')
const controllers = require('./controllers')
const fs = require('fs')
const getStat = require('util').promisify(fs.stat);
const { readdirSync, rename } = require('fs');
const moment = require('moment');
const { Console } = require('console');

const app = express()
app.use(cors());
const port = 3333

const KEYFILEPATTH = `${__dirname}/icaf-sotrage-cc16d45485e3.json`
const SCOPES = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATTH,
  scopes: SCOPES
})

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
  try {
    if (!req.files) {
      return res.status(500).send({ msg: "file is not found" })
    }
    const myFile = req.files.file;
  
    const { username, word, test, wordId, testType } = req.body
  
    const dir = `./users/${username}/${testType}/test_${test}`
  
    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  
    myFile.mv(`${__dirname}/users/${username}/${testType}/test_${test}/${word}.mp3`, function (err) {
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
  } catch (err) {
    return res.send({ error: err});
  }
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

app.get('/driveTest', async (req, res) => {
  try {
    console.log(req)
    const driveService = google.drive({
      version: 'v3',
      auth
    })
  
    const fileMetaData = {
      name: 'test/Imagem de teste.PNG',
      parents: ['17ZBmHo3mW_IfRLS-s1UTZWKMZum_CCzB']
    }
  
    const media = {
      mimeType: 'image/png',
      body: fs.createReadStream('diagramaaaa.PNG')
    }
  
    try {
      const response = await driveService.files.create({
        resource: fileMetaData,
        media,
        fields: 'id'
      })  

      return res.send({ message: 'success' });
    } catch(err) {
      console.log(err)
      return res.send({ error: err });
    }
  } catch(err) {
    console.log(err)
    return res.send({ error2: err });
  }
})

app.listen(process.env.PORT || 3000)
