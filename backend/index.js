import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express(); // express function 

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Belles01!",
    database:"test",
})


//middleware, it allows to send any json file using client
app.use(express.json())
app.use(cors())
//how we are making an api request using express server 
//when we visit homepage we get a request from the user and then we send a response 
app.get("/",(req,res)=>{
    res.json("hello this is the backend")
})

//response 
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books" //selecting all from books table 
    db.query(q, (err, data)=>{   //running the query if theres an error send messgae if not send data back
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req,res)=>{ //this is a req bc we are getting stuff from users 
    const q = "INSERT INTO books (`title`, `desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title, 
        req.body.desc, 
        req.body.price, 
        req.body.cover, 
    ]

    db.query(q,[values], (err,data)=>{ //running the query if theres an error send messgae})
        if(err) return res.json(err)
        return res.json("book has been created successfully! 📕")
})
})

//put method for update 
app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id; //params and id means the url "/books/:id"
    const q = "UPDATE books SET `title` = ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id =? " ; 

    const values = [
        req.body.title, 
        req.body.desc, 
        req.body.price, 
        req.body.cover, 
    ]
 

    db.query(q,[...values, bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("book has been updated successfully! 📕")

    })
})

//delete
app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id; //params and id means the url "/books/:id"
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("book has been deleted successfully! 📕")

    })
})
//we are creating a function that connects us to the backend servers 
app.listen(8800, ()=> {
    console.log("connected to backend server!")
})

