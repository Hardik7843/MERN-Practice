const { error } = require('console')
const express = require('express')
const app = express()
const path = require('path')
const UserModel = require('./usermodel')
const { request } = require('https')
const { ClientRequest } = require('http')
const usermodel = require('./usermodel')
const { name } = require('ejs')
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (request, response) => {
    // response.render('index')
    response.render('index', (error) => {
        if(error)
        {
            console.log("error came: ", error)
            response.send(`following error came while loading index page : ${error}`)
        }
        response.render('index')
    })
})

app.post('/create', async (request, response) => {
    let user_name = request.body.name
    let user_age = request.body.age

    const user = await usermodel.create({name : user_name, age : user_age})
    response.redirect('/users')
})

app.get('/users', async (request, response) => {
    let users = await UserModel.find();

    response.render('users', {Users : users})
})

app.get('/editopen/:id', async (request, response) => {
    let user_id = request.params.id;
    const user = await usermodel.findOne({_id : user_id})
    response.render('edit', {user : user})
})

app.post('/editclose', async (request, response) => {
    let user_name = request.body.name
    let user_age = request.body.age
    let user_id = request.body.id

    const user = await usermodel.findOneAndUpdate({_id : user_id}, {name : user_name, age : user_age})
    response.redirect('/users')
})

app.get('/delete/:id', async (request, response) => {
    let user_id = request.params.id;
    console.log(user_id)
    await usermodel.findOneAndDelete({_id : user_id})
    response.redirect('/users')
})



app.listen(3000)