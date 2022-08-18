const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const Product = require('./models/product')
const Farm = require('./models/farm')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStanTake2');
  console.log('MONGO CONNECTION OPEN!')
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware:
app.use(express.urlencoded({ extended: true })) //this will give access to req.body
app.use(methodOverride('_method'))

//FARM ROUTES

app.get('/farms', async(req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', {farms})
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.get('/farms/:id', async(req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm })
})

app.delete('/farms/:id', async (req, res) => {
  const farm = await Farm.findByIdAndDelete(req.params.id);
  
  res.redirect('/farms');
})

app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect('/farms')
})

app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })
})

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
})

//PRODUCT ROUTES

const categories = ['fruit', 'vegetable', 'dairy', 'fungi'];

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category })
      res.render('products/index', { products, category})
    } else {
      const products = await Product.find({})  //this produces a promise like thing (thenable)
      res.render('products/index', { products, category: 'All' })
    }
     
})

app.get('/products/new', (req, res) => {
  res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save();
  console.log(newProduct)
  res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('farm', 'name');
  console.log(product)
  console.log(product);
  res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => { //form to edit
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!')
})


// /categories/dairy

// /products?category=dairy