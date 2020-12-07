const express = require('express')
const app = express()
const port = 4000 //new port
const cors = require('cors');// cross origin resourse sharing
const bodyParser = require("body-parser");
const { Redirect } = require('react-router-dom');
const mongoose = require('mongoose');// connects mongoose
const path = require('path'); //path to be called

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//configuration, telling where build and static folder is
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

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

    //finds all docs in database
    MovieModel.find((err, data) => {
        res.json(data);
    })

})

//gets id and finds in db
app.get('/api/movies/:id', (req, res) => {
    console.log(req.params.id);

    MovieModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

//puts in the new info
app.put('/api/mpvies/:id', (req, res) => {
    console.log("Update Movie: " + req.params.id);
    console.log(req.body);

    //updating the record by id
    MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        (err, data) => {
            res.send(data);
        })
})

//deletes on specific id
app.delete('/api/movies/:id', (req, res) => {
    console.log(req.params.id);

    MovieModel.findByIdAndDelete({ _id: req.params.id },
        (err, data) => {
            if (err)
                res.send(err);
            res.send(data);
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

//for all other roots, send file back 
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
