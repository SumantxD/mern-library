const express = require('express')
const mongoose = require('mongoose')

const Blog = require('./models/blog')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))


mongoose.set('strictQuery', false);

const dbURI = 'mongodb+srv://sumant1234:sumant1234@sumantcluster.rfano2s.mongodb.net/mernapp?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result)=> {
        console.log('connected to the database')
        app.listen(3000)
    })
    .catch((err) => console.log(err))


// in the main page we will pass an array of blogs then we 
// will iterate through it and will create individual objects according to it


app.get('/blogs/create', (req,res) =>{
    // res.render('create'); 
    // console.log('this is done')
    res.render('create')
})


app.get('/',(req,res) =>{

    res.redirect('/blogs')
}) 

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
        .then((result)=>{
            res.render('index',{title: 'All Blogs', blogs:result})
        })
        .catch((error)=>{
            console.log(error)
        })
}) 

app.post('/blogs',(req,res) => {

    // console.log(req.body)`

    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req,res) =>{
    const id = req.params.id

    Blog.findById(id)
        .then(result =>{
            res.render('details', {blog: result, title: 'Blog Details'})
        })
        .catch(err =>{
            console.log(err)
        })

})

app.delete('/blogs/:id', (req,res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch(err =>{
            console.log(err)
        })
})

app.get('/about',(req,res) =>{
    res.render('about');
}) 






app.use((req,res) =>{
    res.render('404')
})