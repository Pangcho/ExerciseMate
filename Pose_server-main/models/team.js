const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    noticeTitle: {type: String, required: true},
    noticeContent: {type: String, required: true},
    author: {type: String, required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
})

const freeBoardSchema = new mongoose.Schema({
    postTitle: {type: String, required: true},
    postContent: {type: String, required: true},
    author: {type: String, required: true},
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    comments: [{
        user: {type: String, required: true},
        content: {type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    }]
})

const anonymousBoardSchema = new mongoose.Schema({
    postTitle: {type: String, required: true},
    postContent: {type: String, required: true},
    likes: [{type: String, required: true}],
    comments: [{type: String, required: true}]
})
const goalSchema = new mongoose.Schema({
    dDay: {type: Date, required: true},
    goals: [{
        label: {type: String, required: true},
        cycle: {type: String, required: true},
        number: {type: String, required: true},
        attain: {type: String, default: '0', required: false}
    }]
})

const chatSchema = new mongoose.Schema({
    name: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now},
})
const hostSchema = new mongoose.Schema({
    hostName: {type: String, required: true},
    hostId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
})

const teamSchema = new mongoose.Schema({
    name: {type: String, required: true},
    hashtag: [{type: String, required: true}],
    description: {type: String, required: true},
    host: {type: hostSchema, required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    notice: [{type: noticeSchema, required: false}],
    freeBoard: [{type: freeBoardSchema, required: false}],
    anonymousBoard: [{type: anonymousBoardSchema, required: false}],
    goal: [{type: goalSchema, required: false}],
    chat: [{type: chatSchema, required: false}],
})

mongoose.model('team', teamSchema)