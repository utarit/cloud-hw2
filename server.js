const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
var cors = require('cors')

const connectDB = require('./db/config');
const User = require('./models/User');
const routes = require('./routes/routes');

const app = express();

//App Configurations
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

//Connect database
connectDB();






app.get('/', async (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({
            username
        });

        if (!user) {
            user = await User.create({
                username
            });
        }

        user.save();

        currentUser = user;
        res.redirect(201, '/');
    } catch (error) {
        res.redirect(400, '/');
    }
});

app.delete('/user', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOneAndDelete({
            username: username
        });

        res.redirect(201, '/');
    } catch (error) {
        res.redirect(400, '/');
    }
});

app.post('/login',
    (req, res) => {
        console.log(req.body);
    }

);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listenin in ${process.env.NODE_ENV} mode on port ${PORT}`));