const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const AppError = require('./AppError')

const Product = require('./models/product')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/farmStand2');
  console.log('MONGO CONNECTION OPEN!')
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware:
app.use(express.urlencoded({ extended: true })) //this will give access to req.body
app.use(methodOverride('_method'))


const categories = ['fruit', 'vegetable', 'dairy', 'fungi'];

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(e => next(e))
  }
}

app.get('/products', wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category })
      res.render('products/index', { products, category})
    } else {
      const products = await Product.find({})  //this produces a promise like thing (thenable)
      res.render('products/index', { products, category: 'All' })
    }
}))

app.get('/products/new', (req, res) => {
  res.render('products/new', { categories })
})

app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
}))



app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError('Product Not Found', 404); //no need to put next here bc catch (e) will catch all errors
    }
    res.render('products/show', { product })
}))

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => { //form to edit
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
    throw new AppError('Product Not Found', 404);
    }
    res.render('products/edit', { product, categories })
}))

app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
}))

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect('/products');
})

const handleValidationErr = err => {
  console.dir(err);
  return new AppError(`Validation failed...${err.message}`, 400);
}

app.use((err, req, res, next) => {
  console.log(err.name);
  if(err.name === 'ValidationError') err = handleValidationErr(err)
  next(err);
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!')
})


// /categories/dairy

// /products?category=dairy