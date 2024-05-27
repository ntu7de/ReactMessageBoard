const express = require('express');
const router = express.Router();

const db = require('./firebase');
const { collection, getDocs, updateDoc, doc, addDoc } = require('firebase/firestore');

// Get all messages
router.get('/', async (req, res) => {
    try {
        let ret = [];
        const messageSnapshot = await getDocs(collection(db, 'messages'));
        messageSnapshot.forEach((doc) => {
            ret.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        // Return a succses status in addition to the fetched data
        res.status(200).json(ret);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    // More fetching

    res.status(200).json({ id });
}) 

module.exports = router;