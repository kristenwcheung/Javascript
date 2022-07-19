const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')  //this tells Express to use EJS
app.set('views', path.join(__dirname, '/views')) //taking whatever the absolute path is to the index.js file 

app.get('/', (req, res) => {
    res.render('home.ejs')  //assumes there are files in dir views/
}) 

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit]
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit });
    }
    
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) +1;
    res.render('random', { num }); // "rand" has to match what is in .ejs
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
}) 

//