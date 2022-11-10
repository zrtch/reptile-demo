import express from 'express'
import router from './router'
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(7001, ()=>{
  console.log('server is running')
})