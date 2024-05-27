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

// Upload a new post AND username to database
router.post('/', async (req, res) => {
    try {
        const message = req.body.message;
        const username = req.body.username;
        const docRef = await addDoc(collection(db, "messages"), {
            username: username,
            message: message,
        });
        res.status(200).json({ message: `Successfully stored message with id ${docRef.id}`});
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
})

// Edit a post
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newMessage = req.body.message;
        await updateDoc(doc(db, 'messages', id), {
            message: newMessage,
        })
        res.status(200).json({ message: `Message with ID ${id} successfully updated.`})
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
})

module.exports = router;