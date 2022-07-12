const express = require('express');
const app = express()  //e
// console.dir(app)

// app.use((req, res) => {  //this callback will run whenever a request is received; Express passes req & res as objects via this callback
//     console.log('we got a new request')
//     // res.send('Hello! We got your request!!!') //http response
//     // res.send({color: 'red'})
//     res.send('<h1>This is my webpage!</h1>')
// })

// /cats => 'meow'
// /dogs => 'woof'
// '/' home page

app.get('/', (req, res) => {
    res.send('This is the homepage!!!')
})

app.get('/r/:subreddit', (req, res) => {  //patterns; ':' means 
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})

app.get('/r/:subreddit/:postId', (req, res) => {  //patterns; ':' means 
    const { subreddit, postId } = req.params;
    res.send(`<h1>Viewing Post ID: ${postId} on the ${subreddit} subreddit</h1>`)
})

app.get('/cats', (req, res) => {  //callback will run when the request received matching '/cats'
    res.send('MEOW!!')
})

app.post('/cats', (req, res) => {  
    res.send('Post request to /cats!!! This is different than a get request!!')
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!!')
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if(!q){
        res.send('NOTHING FOUND IF NOTHING SEARCHED!')
    }
    res.send(`<h1>Search results for: ${q}</h1>`)
})

app.get('*', (req, res) => {  //  * means anything
    res.send(`I dont' know that path!`)
})


app.listen(3000, () => {  //server
    console.log('LISTENING ON PORT 3000')
})