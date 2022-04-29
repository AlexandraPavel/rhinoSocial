const mongoose = require('mongoose')

const Category = mongoose.model('Category', {
    title: {
        type: String,
        required: true,
        maxlength: 40,
        trim: false
    },
    description: {
        type: String,
        required: false,
        maxlength: 125,
        trim: false
    },
    rules: {
        type: String,
        required: true,
        maxlength: 254,
        trim: false
    },
    postsList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
})

module.exports = Category