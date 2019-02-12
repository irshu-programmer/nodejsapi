# nodejsapi


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



<!-- this is the  -->
const express = require('express')
const mysql = require('mysql')

const router = express.Router()

router.get('/messages', (req, res) => {
    console.log("This is the router")
    res.send("This ithe routed")
    // res.end()
})



router.get('/getUser/:id', (req, res) => {


    const connection  = getConnection()
    
    const userId=  req.params.id;
    const queryString = "SELECT * FROM students WHERE id =?";
    connection.query(queryString, [userId], (err, rows, fields) => {
    
        if(err){
            console.log('Failed to query for user'+err)
        res.sendStatus(500)
            
            res.end();
            return
        }
        // res.send("Fetching user with id "+req.params.id)
        res.json(rows)
    
    })
    })
    function getConnection(){
        return  pool
    }

    const pool = mysql.createPool({
        connectionLimit: 10,

        user: 'root',
            password: '',
            host: "localhost",
            database: "studentdb"
    })



router.get('/allUser', (req, res) => {


    const connection  = getConnection()
    
    
    const queryString = "SELECT * FROM students ";
    connection.query(queryString, (err, rows, fields) => {
    
        if(err){
            console.log('Failed to query for user'+err)
        res.sendStatus(500)
            
            res.end();
            return
        }
        // res.send("Fetching user with id "+req.params.id)
        res.send(JSON.stringify(rows) )
    
    })

    // res.send("Fetching user with id "+req.params.id)
    // res.end();

})

router.post('/create_user', (req, res) => {
    console.log("Trying to create a new user...")

    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;


    const queryString = "INSERT INTO students (first_name,last_name,email) VALUES(?,?,?)"
    getConnection().query(queryString, [firstName, lastName,email], (err, result, fields) => {
        if(err){
            console.log("Failed to insert user")
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new user ", result.insertedId)
        res.end()
    })
    // res.end();
})


module.exports = router