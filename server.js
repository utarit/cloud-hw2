const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.get('/', (req, res) => {
    
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listenin in ${process.env.NODE_ENV} mode on port ${PORT}`));