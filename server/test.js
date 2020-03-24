const Express = require("express");
const BodyParser = require ("body-parser");

//Establish a connection
const MongoClient = require("mongodb");
//allow us to work with ids document
const ObjectId = require ("mongodb").ObjectId;

const CONNECTION_URL="mongodb+srv://admin:admin@denzel1-4cvu2.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME="imdb";

var app=Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

app.listen(9292, ()=>{
    MongoClient.connect(CONNECTION_URL,{useNewUrlParser: true},(error,client)=>{
        if(error){
            throw error;
        }
        database=client.db(DATABASE_NAME);
        collection=database.collection("movies");
        console.log("Connected to '"+DATABASE_NAME+ "'!" );
    });
});