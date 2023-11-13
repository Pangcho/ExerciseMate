const mongoose = require('mongoose')

const indexSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
})

mongoose.model('index', indexSchema)


