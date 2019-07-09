const express = require('express');

const Data = require('./db.js');

const router = express.Router();

router.use(express.json());

//Post
router.post('/', (req, res) => {
    const newPost = req.body;

    if (isValidPost) {
        Data.insert(newPost)
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({
                    error: "There was an error while saving the post to the database"
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
})

//Post comment 
router.post('/:id/comments', (req, res) => {
    const newComment = req.body;
    const {
        id
    } = req.params;

    Data.findById(id)
        .then(found => {
            if (id !== found) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            } else {
                if (!newComment.text) {
                    res.status(400).json({
                        errorMessage: "Please provide text for the comment."
                    })
                } else {
                    Data.insertComment(newComment)
                        .then(comment => {
                            res.status(201).json(comment)
                        })
                        .catch(err => {
                            res.status(500).json(err)
                        })
                }
            }
        })
})


//Get posts
router.get('/', (req, res) => {
    Data.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
})

//Get by id
router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;

    Data.findById(id)
        .then(found => {
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be retrieved."
            })
        })
})

//Get comments
router.get('/:id/comments', (req, res) => {
    const {
        id
    } = req.params;

    Data.findPostComments(id)
        .then(found => {
            if (found) {
                res.status(200).json(found)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The comments information could not be retrieved."
            })
        })
})

//Delete post
router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;

    Data.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
})

//Put update
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    if (isValidPost) {
        Data.update(id, updates)
            .then(updated => {
                if (updated) {
                    res.status(200).json(updates).end();
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The post information could not be modified." });
            });
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })


function isValidPost(post) {
    const {
        title,
        contents
    } = post;

    return title && contents;
}

module.exports = router;