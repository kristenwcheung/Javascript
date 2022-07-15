const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs')  //this tells Express to use EJS
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home.ejs')  //assumes there are files in dir views/
}) 

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit });
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) +1;
    res.render('random', { rand: num }); // "rand" has to match what is in .ejs
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})