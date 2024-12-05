
// server.mjs
import { createServer } from 'node:http';
import express from "express";
import path from "path";
import { fileURLToPath} from 'node:url';
import { error } from 'node:console';

const __fileURLToPath = fileURLToPath(import.meta.url);
 // debug statment 
console.log("fileURL ", import.meta.url)



const __dirname = path.dirname(__fileURLToPath)
// storing express in app
const app = express();

// Serving static files
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));



// console.log(__dirname + '__dirname');
// serving a static html
app.get('/index' , (req, res) => {
    res.sendFile(path.join(__dirname, "public"));
});





// starts a simple http server locally on port 3000
app.listen(3000, '127.0.0.1', () => {
  console.log('Listening on http://127.0.0.1:3000');
});

 
// database connection
const mysql = require('mysql');
const connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"malek11.17",
  databast:"fin"


})

// create tasks
app.post("tasks", (req,res) => {
  const {title, status, description} = req.body;
  const query = "INSERT INTO task(title, description) VALUES (?, ?)"

  connection.query(query,[title, status, description], (err, results) => {
      if (err) throw err;
  res.status(201).json({id : results.insertId });
  });
});



// read tasks 
app.get("/task", (req, res) => {
  connection.query("SELECT * FROM task", (err, results) => {
       if (err) throw err;
      res.json(results);
  });
});


//Middleware setup 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// form validtion middleware
const validtionTask = (req, res, next) =>{
  const {title} = req.body;
  if (!title || title.length < 3){
    return res.status(400).json({error: 'titele must be al least 3 characters'});
  }
  next();
  };
  //using the validtion
  add.post("/task", validtionTask, (req, res) =>{
    //handle task creation 
});

 

// creating task to show in the UI