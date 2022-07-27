const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStand');
  console.log('MONGO CONNECTION OPEN!')
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/dog', (req, res) => {
    res.send('Woof')
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!')
})