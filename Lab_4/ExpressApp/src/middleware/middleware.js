//Middleware to log incoming requests
const logger = (req,res,next)=>{
    console.log(`${req.method}${req.originalUrl} - ${new Date().toISOString()}`);
    next();
}

//Validate Movie data before creating or updating
const validateMovie = (req,res,next)=>{

    const{ title,studio,year,genres,directors} = req.body;
    if(!title || !studio || !year || !genres || !directors){
        return res.status(400).send('Missing required fields:title,studio,genres, year or directors');
    }
    if(typeof year !== 'number' || year < 1888 || year > new Date().getFullYear()){
        return res.status(400).send('Invalid Year');
    }

    next();

};

//Middleware to handle 404
const handleNotFound=(req,res)=>{
    res.status(404).send('Page not found');
};

module.exports ={
    logger,
    validateMovie,
    handleNotFound
};