const express = require('express')
const Comment = require('../models/comment')
const router = new express.Router()

router.post('/comments', async (req, res) => {
    const comment = new Comment(req.body)
    
    try {
        await comment.save()
        res.status(201).send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find({})
        res.send(comments)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/comments/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const comment = await Comment.findById(_id)

        if (!comment) {
            return res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/commentsByIds', async (req, res) => {
    const ids = req.body

    try {
        const comments = await Comment.find({
            '_id': { $in: ids}
        });
        res.send(comments)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/comments/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['text', 'date', 'upvote', 'downvote']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if (!comment) {
            return res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/comments/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id)

        if (!comment) {
            return res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/comments', async (req, res) => {
    const ids = req.body

    try {
        const comment = await Comment.deleteMany({_id:{$in:ids}})

        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router