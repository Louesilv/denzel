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

/*
app.post("/movies",(request,response)=>{
    collection.insertOne(request.body,(error,result)=>{
        if(error){
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});*/

//Populate the database with all the Denzel's movies from IMDb
app.get("/movies/populate/:id", async (request,response)=>{

    const allMovies = await sdb(request.params.id);
    console.log(allMovies);
    collection.insertMany(allMovies,(error,result)=>{
        if(error){
            return response.status(500).send(error);
        }
        console.log(result.status);
        response.send(result);
    });

});

//get all films 
app.get("/movies",(request,response)=>{
    const all= collection.find({}).toArray((error,result)=>{
        if(error){
            return response.status(500).send(error);
        }
        console.log(result.status);
        response.send(result);
    });
    console.log(all);

});

