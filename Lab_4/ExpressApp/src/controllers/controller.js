const Movie = require('../models/Movies');
const fs =require('fs');

//Function 
exports.getMovies = async(req,res)=>{
    try{

        // commenting the original code //
        /*
        const movies = await Movie.find();
         res.status(200).json(movies);

         */

         // customizing functions with details //

         const allFilms = await Movie.find(); // Renamed variable to allFilms

         const { name, category, releaseYear } = req.query; // Renamed query parameters
 
         let moviesList = allFilms; // Renamed finalMovies to moviesList


         // Adding Search by NAME Module using RegExp for case-insensitive matching
        if (name) {
           const nameRegex = new RegExp(name, 'i'); // 'i' flag for case-insensitive search
           moviesList = moviesList.filter((film) => nameRegex.test(film.title));
         }

       
         //Adding Filter by CATEGORY module using RegExp
        if (category) {
          // const categoryRegex = new RegExp(category, 'i'); // Case-insensitive RegExp for category matching
           const categoryRegex = new RegExp(`\\b${category}\\b`, 'i'); // Case-insensitive exact word match
          moviesList = moviesList.filter((film) =>
         film.genres.some((genre) => categoryRegex.test(genre)) // Check if any category matches the pattern
           );
          }       
          
          //Adding Filter by RELEASE YEAR with strict comparison
        if (releaseYear) {
           moviesList = moviesList.filter((film) => film.year == releaseYear); // Direct comparison
         }
  
        // Returning the filtered list of movies and their count
        res.json(moviesList);

    }
    catch(e){
            console.error(e);
            res.status(500).send('Error retrieving Movies');
    }
};

//Function to create a new movie
exports.createMovie = async(req,res)=>{
    try{
        const newMovie = new Movie(req.body);
        await newMovie.save();
         res.status(201).json(newMovie);
    }
    catch(e){
            console.error(e);
            res.status(500).send('Error creating Movies');
    }
};


//Get a single movie by Id
exports.getMovieById = async(req,res) =>{
try{
    const movie = await Movie.findById(req.params.id);
    if(!movie){
        return res.status(404).send('Movie is not found');
    }
    res.status(201).json(movie);

}
catch(e){
    console.error(e);
    res.status(500).send('Error retrieving the Movies');
}
};


//update Movie

//Get a single movie by Id
exports.updateMovie = async(req,res) =>{
    try{
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedMovie){
            return res.status(404).send('Movie is not updated');
        }
        res.status(201).json(updatedMovie);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error uodating the Movies');
    }
    };


    //Delete a single movie by Id
exports.deleteMovie = async(req,res) =>{
    try{
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if(!deletedMovie){
            return res.status(404).send('Movie not found');
        }
        res.status(201).json(deletedMovie);
    
    }
    catch(e){
        console.error(e);
        res.status(500).send('Error deleting the Movies');
    }
    };

    // Function to import movies (moved from index.js)
exports.importMovies = async (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync('./movies.json', 'utf-8')); // Read data from movies.json
        const count = await Movie.countDocuments();
        if (count === 0) {
            await Movie.create(data); // Create movies in the database
            console.log('Data successfully imported to MongoDb');
            res.status(200).send('Data successfully imported');
        } else {
            res.status(200).send('Data already exists, skipping import');
        }
    } catch (e) {
        console.error('Error importing data', e);
        res.status(500).send('Error importing data');
    }
};
