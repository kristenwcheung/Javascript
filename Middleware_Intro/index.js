const express = require('express');
const morgan = require('morgan');
const app = express();
const morgon = require('morgan');



app.use(morgan('tiny'))  //app.use is a way to get codes to run on every request

app.use((req, res, next) => {
    // req.method = 'GET' //can override method like this
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log('I LOVE DOGS!!')
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    res.send('SORRY YOU NEED A PW!')
}

// app.use((req, res, next) => {
//     console.log('THIS IS MY FIRST MIDDLEWARE')
//     next();
//     console.log('THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()')
// })

// app.use((req, res, next) => {
//     console.log('THIS IS MY SECOND MIDDLEWARE')
//     next();
// })

// app.use((req, res, next) => {
//     console.log('THIS IS MY THIRD MIDDLEWARE')
//     next();
// })

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    res.send('woof woof!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('My secret is sometimes I wear headphones in public so I do not have to talk to anyone')
})
 
app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})