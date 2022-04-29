const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true,
        maxlength: 40,
        trim: false
    },
    // link: {
    //     type: String,
    //     required: false,
    //     trim: false
    // },
    description: {
        type: String,
        required: false,
        maxlength: 125,
        trim: false
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: false
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
    },
    favourite: {
        type: Boolean,
        required: false,
        default: false
    },
    // comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],
    commentsList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

module.exports = Post