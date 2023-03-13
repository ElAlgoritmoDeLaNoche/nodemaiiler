const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.use(require('./routes/index'))

app.use(express.static(__dirname, + '/public'))

app.listen(5000, () => {
  console.log('Server listening on -> http://localhost:5000')
})