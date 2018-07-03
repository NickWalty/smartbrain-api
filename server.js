const express = require ('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//create DB link to smart-brain db
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'pass',
    database : 'smart-brain'
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// }); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Create a dummy database to use for login testing
// const database = {
// 	users: [
// 		{
// 		id: '123',
// 		name: 'John',
// 		email:'john@gmail.com',
// 		password: 'cookies',
// 		entries: 0,
// 		joined: new Date()
// 		},
// 		{
// 		id: '124',
// 		name: 'Sally',
// 		email:'sally@gmail.com',
// 		password: 'bananas',
// 		entries: 0,
// 		joined: new Date()
// 		}
// 	]
// }


app.get('/', (req,res) => {res.send('It is working!')})

//Use the DB to test login
app.post('/signIn', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)})

//Create new user in the user database AND one in the login database
app.post('/register', (req,res) => {register.handleRegister(req, res, db, bcrypt)})

//get the user's profile
app.get('/profile/:id', (req,res) => {profile.getProfile(req, res, db)})

//Increase a user's count when they upload an image.
app.put('/image', (req,res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req,res) => {image.handleAPICall(req, res)})

//Does it compile???
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is now running on port ${process.env.PORT}.`);
})
