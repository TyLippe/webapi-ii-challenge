const express = require('express');

const Data = require('./db.js');

const router = express.Router();

router.use(express.json());

//Post
router.post('/', (req, res) => {
    const newPost = req.body;

    Data.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Post comment 
router.post('/:id/comments', (req, res) => {
    const newComment = req.body

    Data.insertComment(newComment)
        .then(comment => {
            res.status(201).json(comment)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Get posts
router.get('/', (req, res) => {
    Data.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Get by id
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Data.findById(id)
        .then(found => {
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json({ message: 'ID not found' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Get comments
router.get('/:id/comments', (req, res) => {
    const { id } = req.params;

    Data.findPostComments(id)
        .then(found => {
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json({ message: 'ID not found' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Delete post
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Data.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'ID not found.' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//Put update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    Data.update(id, updates)
        .then(update =>  {
            res.status(201).json(update)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;
