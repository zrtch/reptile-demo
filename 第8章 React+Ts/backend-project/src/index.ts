import express from 'express'
import router from './router'
import cookieSession from 'cookie-session'
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'session',
  keys: ['teacher dell'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(router)

app.listen(7001, ()=>{
  console.log('server is running')
})