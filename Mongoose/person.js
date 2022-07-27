const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
  console.log('CONNECTION OPEN!')
}

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function() {
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function () {
    this.first = 'Yo';
    this.last = 'Mama';
    console.log('ABOUT TO SAVE!')
})
personSchema.post('save', async function() {
    console.log('JUST SAVED!')
})

const Person = mongoose.model('Person', personSchema)