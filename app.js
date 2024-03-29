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


// create API for all exercise .
app.get("/courses/full/exercise",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    let exercise_array = []
    for(i of jsdata){
        exercise_array.push(i.exercise)
    }
    res.send(exercise_array)
})



//create API for course's exercise by id .
app.get("/course/exercise/:id",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    let id = req.params.id
    for(i of jsdata){
        if(i.id == id){
            res.send(i.exercise)
        }
    }
})

// create API for sub_exercise .
app.get("/courses/exercise/fullsubexercise",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    let sub_exercise_array = []
    for (i of jsdata){
        for(j of i.exercise){
            sub_exercise_array.push(j.sub_exercise)
        }
    }
    console.log(sub_exercise_array)
    res.send(sub_exercise_array)
})


// create API for sub_exercise by id
app.get("/get/exercise/:id/subexercise/:id",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    let id1 = req.params.id
    let id2 = req.params.id
    for(i of jsdata){
        if(i.id == id1){
            for(j of i.exercise){
                if(j.id  == id2){
                    if(j.sub_exercise.length == 0){
                        res.send("empty sub_exercise []")
                    }
                    let sub_exercise = j.sub_exercise
                    res.send(sub_exercise)
                }
            }
        }
    }
    res.send("this id is not here")
})



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



// create API for updating exercise .
app.post("/add/exercise/:id",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    let id = req.params.id
    for(i of jsdata){
        if(i.id == id){
            let exercise_array = i.exercise
            let body_data = {
                id : i.exercise.length + 1,
                exerName : req.body.exerName,
                sub_exercise : req.body.sub_exercise
            }
            exercise_array.push(body_data)
        }
    }
    fs.writeFileSync("data.json",JSON.stringify(jsdata,null , 2));
    console.log("new course added .")
    res.send(jsdata)
})





// create API FOR update the course .
app.put("/update/:id",(req,res) => {
    let jsondata = fs.readFileSync("data.json");
    let jsdata = JSON.parse(jsondata);
    let id = req.params.id
    for(i of jsdata){
        if(i.id == id){
            i.id = id
            i.courseName = req.body.courseName
            i.exercise = req.body.exercise
        }
    }
    fs.writeFileSync("data.json",JSON.stringify(jsdata,null , 2));
    console.log("course updated  .")
    res.send(jsdata)

})



app.listen(MY_PORT,() => {
    console.log(`server is running on >>>>> ${MY_PORT}`)
});


