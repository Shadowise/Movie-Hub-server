// Import dotenv package and configure it
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

//Imports routes to app.js from authRouter in routes folder
const authRouter = require("./routes/authRouter");

const movieRouter = require("./routes/movieRouter");

const bookmarkRouter = require("./routes/bookmarkRouter");

// Import the error file from middleware folder
const error = require("./middlewares/error");

//Spins up a new express application
const app = express();

const port = 4000;

app.use(cors());

// A middleware that allows access to the req.body on all request (without this you can't test on postman)
app.use(express.json());

// middleware for login and register for authentication router
app.use("/api/auth", authRouter);

// middlware for movie router
app.use("/api/movie", movieRouter);

app.use("/api/bookmark", bookmarkRouter);

// custom middleware for errors

app.use(error)

//start listening on a given port and run the callback functio
const start = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
       console.log("Database Connected");

       await app.listen(port, () => {
        console.log(`Server is running on PORT ${port}`);
        
    });
        
    } catch (error) {
        console.log(error);
        console.log("Unable to connect");
        
        
    }
};

start();




// shadowise147
// vDGfSWCWy25uIjoj
// mongodb+srv://shadowise147:UsL9pNXK8gAwzNL3@cluster0.2rjur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
