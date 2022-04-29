const express = require('express')
const Post = require('../models/post')
const router = new express.Router()

router.post('/posts', async (req, res) => {
    const post = new Post(req.body)

    try {
        console.log(req.body)
        await post.save()
        res.status(201).send(post)
    } catch (e) {
        console.log(res.body)
        res.status(400).send(e)
    }
})

router.post('/postsByIds', async (req, res) => {
    const ids = req.body
    try {
        const posts = await Post.find({
            '_id': { $in: ids}
        });

        if (posts.length === 0) {
            return res.status(404).send()
        }

        res.send(posts)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})


router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({})
        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/posts/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const post = await Post.findById(_id)

        if (!post) {
            console.log(post)
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/posts/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [
        'title',
        'description',
        'date',
        // 'link',
        'image',
        'text',
        'upvote',
        'downvote',
        'favourite']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        console.log("Not good", res)
        res.status(400).send(e)
    }
})

router.patch('/postComment/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['comment']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const post = await Post.updateOne(
            { _id: req.params.id},
            {"$push": { "commentsList": req.body.comment } }
          ).exec();

        if (!post) {
            return res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if (!post) {
            res.status(404).send()
        }

        res.send(post)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router