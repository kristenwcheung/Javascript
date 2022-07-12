const express = require('express');
const app = express();

app.set('view engine', 'ejs')  //this tells Express to use EJS

app.get('/', (req, res) => {
    res.render('home.ejs')  //assumes there are files in dir views/
})

app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000')
})