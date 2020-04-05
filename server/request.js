const Express = require("express");
const BodyParser = require ("body-parser");

const sdb =require("./sandbox.js");

//Establish a connection
const MongoClient = require("mongodb");
//allow us to work with ids document
const ObjectId = require ("mongodb").ObjectId;

const {movies, id, metascore} = require('./sandbox');

const CONNECTION_URL="mongodb+srv://admin:admin@denzel1-4cvu2.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME="imdb";

var app=Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.listen(9292, ()=>{
    MongoClient.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology:true},(error,client)=>{
        if(error){
            throw error;

        }
        database=client.db(DATABASE_NAME);
        collection=database.collection("movies");
        console.log("Connected to '"+DATABASE_NAME+ "'!" );
    });
});


//Populate the database with all the Denzel's movies from IMDb
app.get("/movies/populate/:id", async (request,response)=>{

    const allMovies = await sdb(request.params.id);
    
    collection.insertMany(allMovies,(error,result)=>{
        if(error){
            return response.status(500).send(error);
        }
        console.log(JSON.stringify(allMovies, null, 2));
        response.send(result.result.countDocuments);
    });

});

//Delete all the document in database
app.get("/movies/reset", async (request,response)=>{
    
    collection.deleteMany({},(error,result)=>{
        if(error){
            return response.status(500).send(error);
        }
        response.send(result.result);
    });

});

//Get all the film in  DB
app.get("/movies/all",(request,response)=>{
    const all= collection.find({}).toArray((error,result)=>{
        if(error){
            return response.status(500).send(error);
        }
        response.send(result);
    });

});

//fetch a specific movie
app.get("/movies/:id",(request,response)=>{
    collection.findOne({"id": request.params.id},(error,result)=>{
        if(error){
            return response.status(500).send(error);
        }
        console.log(result);
        response.send(result);
    });

});

//fetch a random movie
app.get("/movies",(request,response)=>{
    collection.aggregate([{ $sample :{ size:1 } }]).toArray((error,result)=>{
            if(error){
                return response.status(500).send(error);
            }
            response.send(result);
        });
});
//Search for Denzel's movies.
app.get("/movies/search?metascore=77", async (request,response)=>{
    //var limite = request.query.limit;
    //var meta= request.query.metascore;
    console.log(request.url);
    collection.find({ }).toArray((error,result)=>{
            if(error){
                return response.status(500).send(error);
            }
            response.send(result);
        });
        /*
    console.log(JSON.stringify(res, null, 2));
    const awesome = res.filter(movie => movie.metascore >= meta);
    response.send(awesome);*/
});

//Search for Denzel's movies.
app.get("/movies/search?metascore=77", async (request,response)=>{
    //var limite = request.query.limit;
    //var meta= request.query.metascore;
    console.log(request.url);
    collection.find({ }).toArray((error,result)=>{
            if(error){
                return response.status(500).send(error);
            }
            response.send(result);
        });
        /*
    console.log(JSON.stringify(res, null, 2));
    const awesome = res.filter(movie => movie.metascore >= meta);
    response.send(awesome);*/
});

//Save a watched date and a review
app.post("/movies/:id",(request,response)=>{
    var myObjet={"id":new ObjectId(request.params.id),
                "body": new BodyParser(request.body)};
    console.log(myObjet);
    collection.insertOne(request.body,(error,result)=>{
        if(error){
            console.log("error");
            return response.status(500).send(error);
        }
        console.log("pk");
        response.send(result.result);
    });
});

