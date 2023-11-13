const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploadImage/')
    },
    filename: (req, file, cb) => {
        const email = req.body.email
        cb(null, email + '-' + Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage})

router
    .post('/sendVerificationCode', userController.sendVerificationCode)
    .post('/verifyCode', userController.verifyCode)
    .post('/registerSimpleUser', userController.registerSimpleUser)
    .post('/registerDetailUser', userController.registerDetailUser)
    .post('/login', userController.login)
    .get('/getUserFullInfo', userController.getUserFullInfo)
    .get('/getRecommendUsers', userController.getRecommendUsers)
    .post('/followUser', userController.followUser)
    .post('/goalSetting', userController.goalSetting)
    .post('/getFollowers', userController.getFollowers)
    .post('/getFollowing', userController.getFollowing)
    .put('/updateProfile', userController.updateProfile)
    .put('/updateInformation', userController.updateInformation)
    .post('/isPasswordCorrect', userController.isPasswordCorrect)
    .put('/updatePassword', userController.updatePassword)
    .post('/getUnfollow', userController.getUnfollow)
    .delete('/deleteFollowers', userController.initialFollower)
    .get('/initialGoal', userController.initialGoal)
    .post('/uploadPost', upload.single('file'), userController.uploadPost)
    .delete('/deleteMyPost/:postId', userController.deleteMyPost)
    .put('/updateMyPost/:postId', userController.updateMyPost)
    .get('/getPosts', userController.getPosts)
    .post('/updateUserExerciseAttain', userController.updateUserExerciseAttain)
    .post('/postUserPostComment', userController.postComment)
    .delete('/deleteUserPostComment/:userId/:postId/:commentId', userController.deletePostComment)
    .delete('/initialUserPostComment', userController.initialUserPostComment)
    .post('/postUserPostHeart', userController.postHeart)
    .delete('/deleteUserPost', userController.initialUserPost)
    .get('/getMyPosts', userController.getMyPosts)
    .get('/getFollowersExercisesStatus', userController.getFollowersExercisesStatus)
    .get('/getOtherUserInfo/:userId', userController.getOtherUserInfo)
    .post('/getOtherUserFollowersFollowing', userController.getOtherUserFollowersFollowing)
    .put('/updateInformationPublic', userController.updateInformationPublic)
module.exports = router;
