const express = require('express')
const app = express()
const port = 4000 //new port
const cors = require('cors');// cross origin resourse sharing
const bodyParser = require("body-parser");
const { Redirect } = require('react-router-dom');
const mongoose = require('mongoose');// connects mongoose

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const myConnectionString = 'mongodb+srv://admin:admin@cluster0.qumix.mongodb.net/movies?retryWrites=true&w=majority'
mongoose.connect(myConnectionString, { useNewUrlParser: true });

//defining our scheme
const Schema = mongoose.Schema;

//telling database what kind of data your adding
var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});

//creates model for database
var MovieModel = mongoose.model("movie", movieSchema);

//gets data at api / movies
app.get('/api/movies', (req, res) => {
    // const mymovies = [{
    //     //json data
    //     "Title":"Avengers: Infinity War",
    //     "Year":"2018",
    //     "imdbID":"tt4154756",
    //     "Type":"movie",
    //     "Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
    //     },
    //     {
    //     "Title":"Captain America: Civil War",
    //     "Year":"2016",
    //     "imdbID":"tt3498820",
    //     "Type":"movie",
    //     "Poster":"https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
    //     }];

    //finds all docs in database
    MovieModel.find((err, data) => {
        res.json(data);
    })

    // //status code 200 to say everything is working
    // res.status(200).json({
    //     message: "Everything is ok",
    //     movies: mymovies
    // });
})

//gets id and finds in db
app.get('/api/movies/:id', (req, res)=>{
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data) =>{
        res.json(data);
    })
})


//listening for a post request
app.post('/api/movies', (req, res) => {
    console.log('Movie received!');
    console.log(req.body.title);
    console.log(req.body.year);
    console.log(req.body.poster);

//Movie for model
    MovieModel.create({
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster
    })

    res.send("Item Added!");
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', ((req, res) => {
    res.send('hello')
}))