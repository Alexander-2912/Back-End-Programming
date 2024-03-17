const express = require('express')
const app = express()
const port = 3000
const ejs = require('ejs')
// const expressLayout = require('express-ejs-layouts')

app.set('view engine', 'ejs')

//static
app.use(express.static('website/Login'))
app.use(express.static('website/Register'))
app.use(express.static('website/mainpage'))
// app.use(express.urlencoded({extended:true}))

// app.use(expressLayout)


app.get('/', (req, res) => {
    res.render('index', {
        title: "Login", 
    })
})

app.get('/register', (req, res) => {
    res.render('register', {
        title: "Register"
    })
})

app.get('/mainpage', (req, res) => {
    res.render('mainpage', {
        title: "To Do List", layout: "mainlayout.ejs"
    })
})

app.listen(port, () => {
    console.log('Example app')
})