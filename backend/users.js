const express = require('express');
const router = express.Router();

const db = require('./firebase');
const { collection, getDocs, updateDoc, doc, addDoc } = require('firebase/firestore');

router.get('/', (req, res) => {
    let ret = [];
    // Get the data

    // Return a succses status in addition to the fetched data
    res.status(200).json(ret);
})

module.exports = router;