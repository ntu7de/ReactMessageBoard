// Import dotenv
require('dotenv').config();
// Import the express module
const express=require('express');
// Create an instance of the express application
const app=express();
// Specify a port number for the server
const port=5001;
// use middleware to parse json request bodies
app.use(express.json());
// Import routers
const usersRouter = require('./users.js');
const messagesRouter = require('./messages.js')

// Router modules
app.use('./users', usersRouter);
app.use('./messages', messagesRouter);

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = require('./firebase');
const { collection, getDocs, updateDoc, doc, addDoc } = require('firebase/firestore');

// Handle CORS
const cors = require("cors")
app.use(cors());

