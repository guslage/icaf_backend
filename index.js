const express = require('express')
const stream = require('stream')

const fileUpload = require('express-fileupload');
const cors = require('cors')
const { google } = require('googleapis')

const bodyParser = require('body-parser')
const controllers = require('./controllers')
const fs = require('fs')
const getStat = require('util').promisify(fs.stat);

const app = express()
app.use(cors({
  origin: "*",
}));

const { user } = require('./models')

const port = 3333

const KEYFILEPATTH = `${__dirname}/icaf-storage-cc16d45485e3.json`
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
app.use('/tutors', controllers.tutors)
app.use('/diadococinesiaResults', controllers.diadococinesiaResults)


app.use('/', express.static('public'));
app.use(fileUpload());

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

app.post('/upload', async (req, res) => {
  try {
    const { userId, word, test, testType, fileIndex } = req.body
    const myFile = req.files.blob;

    const name = testType === "diadococinesia" 
      ? `${userId}_${testType}_test${test}_${word}_${fileIndex}.mp3` 
      : `${userId}_${testType}_test${test}_${word}.mp3` 

    const file = myFile.data
    file.lastModifiedDate = new Date();
    file.name = name

    const bufStream = new stream.PassThrough()
    bufStream.end(file)

    const driveService = google.drive({
      version: 'v3',
      auth
    })
  
    const fileMetaData = {
      name: name,
      parents: ['17ZBmHo3mW_IfRLS-s1UTZWKMZum_CCzB']
    }
  
    const media = {
      mimeType: 'audio/mpeg',
      body: bufStream
    }
  
    try {
      const response = await driveService.files.create({
        resource: fileMetaData,
        media,
        fields: 'id'
      })  

      console.log(response)

      return res.send({ message: 'success', fileId: response.data.id });
    } catch(err) {
      console.log('err', err)
      return res.send({ error: err });
    }
  } catch(err) {
    console.log('err', err)
    return res.send({ error2: err });
  }
})

app.listen(process.env.PORT || 3333)
