const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    movieID:{type:String},
    title :{type:String},
    studio:{type:String},
    genres:[{type:String}],
    directors:[
        {type:String},
    ],
    writers:[{type:String}],
    actors:[{type:String}],
    year:{type:Number},
    length:{type:Number},
    shortDescription:{type:String},
    mpaRating:{type:String},
    criticsRating:{type:Number}

})

const Movie = mongoose.model('Movies',MoviesSchema);
module.exports = Movie;
