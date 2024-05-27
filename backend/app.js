// Import the express module
const express=require('express');
// Create an instance of the express application
const app=express();
// Specify a port number for the server
const port=5001;
// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// use middleware to parse json request bodies
app.use(express.json());

const db = require('./firebase');
const { collection, getDocs, updateDoc, doc, addDoc } = require('firebase/firestore');

// Handle CORS
const cors = require("cors")
app.use(cors());

