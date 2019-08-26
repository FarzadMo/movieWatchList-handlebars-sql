var express = require("express");
var mysql = require("mysql");
var exphbs = require("express-handlebars");

var app = express();

var PORT = process.env.PORT || 8081;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    port: 3306,
    user: "root",
    password: "farzad1365",
    database: "movie_planner_db",
    host: "localhost"
});

connection.connect(function(err){
    if(err) {
        console.log("connection err"+ err.stack);
    }
    console.log("connection connected as "+connection.threadId);
});

//Routes

app.get("/", function(req, res){
    connection.query("SELECT * FROM movies;", function(err, result){
        if(err){
            return res.status(500).end();
        }

        res.render("index", {movies: result});
    });
});
 






app.listen(PORT, function(){
    console.log("Server is connected on https://localhost/"+PORT);
});