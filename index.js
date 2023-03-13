const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(require('./routes/index'))

app.use(express.static(__dirname, + '/public'))

const PORT = process.env.PORT || 5001

const connect = async () => {

  try {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  } catch (err) {
    console.error("Connection to failed", err.message)
  }
}

connect()