const express = require('express');
const app = express();
const  morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(morgan('short'))
// lets see how ot start refactoring our code 
// i'll show you how to use somehting called router

const router = require('./routes/user.js')
app.use(router)

app.get('/', (req, res)=>{

    console.log("Responding to root route")
    res.send("Hellow Chanakya")
})

app.listen(3003, () => {
    console.log("Server started on port 3003 ... ")
})