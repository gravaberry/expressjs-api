
const express = require('express');


const app= express();
app.use(express.json());


// npm install cors
// import library cors

const cors = require('cors');

//use cors

// app.use(cors())
app.use(cors({
    origin:'http://localhost:3000',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowdHeaders: ['Content-Type'],
}))


// /npm install body-parser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

/// parse application/json
app.use(bodyParser.json());
const port =3000
const postsRoute = require('./routes/posts.js');

app.use('/api/posts', postsRoute)


// app.get('/', (request, response) =>{
//     console.log(request);
//     return response.status(234).send("welcom to MERN Stack Tutorial");
// })

app.listen(port, ()=>{
    console.log(`listening on port , ${port}`)  
})