const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
  console.log('CONNECTION OPEN!')
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number, //'599' would still work bc it could be converted to #
        required: true,
        min: [0, 'Price must be position you dodo!!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    } 

});

productSchema.methods.greet = function() {  //do not use arrow functions bc the value of "this" changes
    console.log('HELLO!!! HI HOWDY!!')
    console.log(`- from ${this.name}`)
}

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale; //this set the true or false value to the opposite
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 0})
}


const Product = mongoose.model('Product', productSchema);



const findProduct = async() => {
   const foundProduct = await Product.findOne({name: 'Mountain Bike'})
   console.log(foundProduct)
   await foundProduct.toggleOnSale();
   console.log(foundProduct)
   await foundProduct.addCategory('Outdoors')
   console.log(foundProduct)
}

Product.fireSale().then(res => console.log(res))

// findProduct();

const bike = new Product({ name: 'Cycling Jersey', price: 28.5, categories: ['Cycling'] });
bike.save()
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log('OH NO ERROR!')
        console.log(err)
    })

Product.findOneAndUpdate({name: 'Tire Pump'}, {price: -99}, {new: true, runValidators: true})
    .then(data => {
        console.log('IT WORKED!');
        console.log(data);
    })
    .catch(err => {
        console.log('OH NO ERROR!')
        console.log(err)
    }) 