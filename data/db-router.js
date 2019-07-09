const express = require('express');

const Data = require('./db.js');

const router = express.Router();

router.use(express.json());

//Post blog
router.post('/', (req, res) => {
    const newInfo = req.body;

    Data.insert(newInfo)
        .then(info => {
            res.status(201).json(info)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;
