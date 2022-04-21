const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config(); //environment variables in .env file

const app = express(); //express server
const port = process.env.PORT || 5000; //port 



const uri = process.env.ATLAS_URI; //uri for database
mongoose.connect(uri, { useNewUrlParser: true } //pass in uri for database
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

//require files
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const mealPlansRouter = require('./routes/meal-plan');
const Users = require('./models/userSchema.model');
const authenticate = require('./middleware/authenticate');
const cookieParser = require('cookie-parser');

//middleware (get data from frontend)
app.use(cors()); 
app.use(express.json()); //allow to parse json 
app.use(express.urlencoded({extended : false}));
app.use(cookieParser()); 

//Register
app.post('/register', async (req,res) => {
    try {
        // get body 
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const createUser = new Users({
            username : username,
            email : email,
            password : password
        });
        
        //create user
        const created = await createUser.save()
        console.log(created);
        res.status(200).send("Registered user!");

    } catch (error) {
        res.status(400).send(error)
    }
});

//Login
app.post('/login', async (req,res) => {
    try {
        //get body
        const email = req.body.email;
        const password = req.body.password;

        //find user exists
        const user = await Users.findOne({email : email});
        if(user){
            //verify password
            const isMatch = await bcryptjs.compare(password, user.password);

            if(isMatch){
                const token = await user.generateToken();
                res.cookie("jwt", token, {
                    //expires token in 1 day
                    expires : new Date(Date.now() + 86400000),
                    httpOnly : true
                })
                res.status(200).send("Logged In")
            }else{
                res.status(400).send("Invalid credentials");
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

//logout
app.get('/logout', (req,res)=> {
    res.clearCookie("jwt", {path : '/'})
    res.status(200).send("User logged out")
})

//authentication
//app.get('/auth', authenticate, (req,res)=>{

//})

//use files
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);
app.use('/meal-plan', mealPlansRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
}); //start server