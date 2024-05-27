const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let ret = [];
    // Get the data

    // Return a succses status in addition to the fetched data
    res.status(200).json(ret);
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    // More fetching

    res.status(200).json({ id });
}) 

module.exports = router;