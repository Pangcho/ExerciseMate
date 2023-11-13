const mongoose = require('mongoose')

const userSettingSchema = new mongoose.Schema({
    isFollowPublic: {type: Boolean, default:false, required: true},
    isAgePublic: {type: Boolean, default:false, required: true},
    isAreaPublic: {type: Boolean, default:false, required: true},
    isWeightPublic: {type: Boolean, default:false, required: true},
    isHeightPublic: {type: Boolean, default:false, required: true},
    isExercisePublic: {type: Boolean, default:false, required: true},
    isWishListPublic: {type: Boolean, default:false, required: true},
    isPostPublic: {type: Boolean, default:false, required: true},
})

const goalSchema = new mongoose.Schema({
    dDay: {type: Date, required: true},
    goals: [{
        label: {type: String, required: true},
        cycle: {type: String, required: true},
        number: {type: String, required: true},
        attain: {type: String, default: '0', required: false}
    }]
});
const userPostSchema = new mongoose.Schema({
    image: {type: String, required: true},
    content: {type: String, required: true},
    date: {type: Date, default: Date.now},
    likes: [{type: String, required: true}],
    comments: [{
        user: {type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        content: {type: String, required: true},
    }]
})
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    sex: {type: String, required: false},
    area: {type: String, required: false},
    height: {type: String, required: false},
    weight: {type: String, required: false},
    age: {type: String, required: false},
    exercise: {type: String, required: false},
    wishList: {type: Array, required: false},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    goal: {type: goalSchema, required: false},
    post: [{type: userPostSchema, required: false}],
    team: [{type: mongoose.Schema.Types.ObjectId, ref: 'team'}],
    setting: {type: userSettingSchema,
        default: {
            isPublic: false ,
            isFollowPublic: false,
            isAgePublic: false,
            isAreaPublic: false,
            isWeightPublic: false,
            isHeightPublic: false,
            isExercisePublic: false,
            isWishListPublic: false,
        },
        required: false},
})

mongoose.model('user', userSchema)


