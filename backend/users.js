const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    let ret = [];
    // Get the data

    // Return a succses status in addition to the fetched data
    res.status(200).json(ret);
})

module.exports = router;