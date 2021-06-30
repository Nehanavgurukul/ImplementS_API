const express = require("express");
const dotenv = require("dotenv");
const myjson = require("./data.json");
const fs = require("fs");
const app = express();
dotenv.config();
app.use(express.json());
let MY_PORT = process.env.PORT


// create API FOR all courses .
app.get("/get/All/Courses",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    res.send(jsdata);
});

// create API for get course by id .
app.get("/get/course/:id",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    let id = req.params.id;
    for(i of jsdata){
        if(i.id == id){
            res.send(i)
        }
    };
});


// create API for add new course .
app.post("/add/course",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    let newCourse = {
        "id" : jsdata.length + 1,
        "courseName" : req.body.courseName,
        "exercise" : req.body.exercise
    }
    jsdata.push(newCourse);
    fs.writeFileSync("data.json",JSON.stringify(jsdata,null , 2));
    console.log("new course added .")
    res.send(jsdata)
});



app.listen(MY_PORT,() => {
    console.log(`server is running on >>>>> ${MY_PORT}`)
});