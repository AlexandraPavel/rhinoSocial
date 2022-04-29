const express = require('express')
const Category = require('../models/category')
const Post = require('../models/post')
const router = new express.Router()

router.post('/categories', async (req, res) => {
    const category = new Category(req.body)

    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categorys = await Category.find({})
        res.send(categorys)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/categories/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const category = await Category.findById(_id)

        if (!category) {
            return res.status(404).send()
        }

        res.send(category)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/categories/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'rules']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!category) {
            return res.status(404).send()
        }

        res.send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/categoryPost/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['post']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    // console.log("Post body", req.body)
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // console.log("Post", req.body.post,  req.params);
        const category = await Category.updateOne(
            { _id: req.params.id},
            {"$push": { "postsList": req.body.post } }
          ).exec();

        // console.log("Added to Categoria", category)
        if (!category) {
            return res.status(404).send()
        }

        res.send(category)
    } catch (e) {

        res.status(400).send(e)
    }
})

router.delete('/categories/:id', async (req, res) => {
    try {
        
        const category = await Category.findByIdAndDelete(req.params.id)

        if (!category) {
            return res.status(404).send()
        }

        res.send(category)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router