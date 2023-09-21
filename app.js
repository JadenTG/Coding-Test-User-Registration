const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const {raw} = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = process.env.port || 3000;

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
    res.render('edit', {user});
});

app.post('/edit/:id', async (req,res) => {
    const {name, org, email, phone, addy} = req.body;
    await User.findByIdAndUpdate(req.params.id, {name, org, email, phone, addy});
    res.redirect('/');
});

app.post('/delete/:id', async (req,res) => {
    try{
        const userId = req.params.id;
        await User.findByIdAndRemove(userId);
        res.redirect('/');
    } catch (err) {
        console.log('Error', err);
    }
});

app.listen(port, () => {
    console.log('Server is running at ', port);
});
