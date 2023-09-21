# User Registration App

This is a simple user registration app built with Express, MongoDB, EJS.

## Getting Started

1. Clone the repo
2. Install the dependencies with `npm install`
3. Start the server with `npm start`
4. Open your browser to `127.0.0.1:3000`

## Code Walkthrough

The app consists of three main files:

* `app.js`: The main Express app file.
* `views/index.ejs`: The home page template.
* `views/edit.ejs`: The edit user template.

### app.js

The `app.js` file is the main entry point of the app. It sets up the Express app, connects to the MongoDB database, and defines the routes for the app.

```javascript
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const {raw} = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("./public"));
app.use(express.static("./views"))

mongoose.connect('mongodb+srv://Jtruje080:westmec@cluster0.spnluj0.mongodb.net/newuser')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.log('Error connect to MongoDB', err);
    });

app.use(express.urlencoded({extend: true}));

app.get('/', async (req,res) => {
    const users = await User.find();
    res.render('index', {users});
})

app.post('/add', async (req,res) => {
    const {name, org, email, phone, addy} = req.body;
    const user = new User(req.body);
    await user.save();
    res.redirect('/');
}); 

app.get('/edit/:id', async (req,res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', {

