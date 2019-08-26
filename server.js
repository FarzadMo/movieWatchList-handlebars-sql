var express = require("express");
var mysql = require("mysql");
var exphbs = require("express-handlebars");

var app = express();

var PORT = process.env.PORT || 8082;

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

//DELETE
app.delete("/api/movies/:id", function(req, res){
    connection.query("DELETE FROM movies WHERE id = (?)", [req.params.id], function(err, result){
        //console.log("server delete result"+ result);
        if(err){
            return res.status(500).end();
        }
        else if (result.affectedRows === 0){
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

//ADD NEW MOVIE
app.post("/api/movies", function(req, res){
    connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function(err, result){
        if(err){
            return res.status(500).end();
        } 
        res.json({ id: result.insertId });
    });
});





app.listen(PORT, function(){
    console.log("Server is connected on https://localhost/"+PORT);
});
