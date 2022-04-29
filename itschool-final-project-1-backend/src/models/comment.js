const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', {
    date: {
        type: Date,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        maxlength: 254,
        trim: false
    },
    upvote: {
        type: Number,
        required: true,
        default: 0
    },
    downvote: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = Comment