import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'

// Create App
const app = express()

// habilitar body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

// db conection
db.sync().then(() => {
  console.log('db conectada')
}).catch(err => {
  console.log(err)
})

// API Routes
app.use('/', router)

// Definir puerto y arrancar proyecto
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`El servidor se esta ejecutando en (http://localhost:${port})`)
})

