const express = require('express')
const app = express()
const port = 3000
const ejs = require('ejs')


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/', (req, res) => {
    res.render('register')
})

app.get('/', (req, res) => {
    res.render('mainpage')
})

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}')
})