const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/relationshipDemo');
  console.log('MONGO CONNECTION OPEN!')
}

const userSchema = new mongoose.Schema({
    first: String,
    last: String, 
    addresses: [     //used array format bc there could be multiple addresses
        {
            _id: {id: false},
            street: String,
            city: String,
            state: String,
            country: String
        } //Mongoose treats this as its embedded Schema so it automatically assigns this an ID
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Kristen',
        last: 'Potter'
    })
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '99 3rd St.',
            city: 'New York',
            state: 'NY',
            country: 'USA'
        }
    )
    const res = await user.save();
    console.log(res);
}


// makeUser()

addAddress('62f67fd7401572bd30d29de7')