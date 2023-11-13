const mongoose = require('mongoose')
const User = mongoose.model('user')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

const getUserFromToken = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({message: 'No token, authorization denied'});
        const decodedToken = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
        const userId = decodedToken._id;
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        if (error.name === 'JsonWebTokenError' && error.message === 'jwt malformed') {
            return res.status(401).json({message: 'Malformed token, authorization denied'});
        }
        return res.status(500).json({message: 'Internal Server Error'});
    }
};
const checkUserExists = (user, res) => {
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
};

const updateProps = async (req, res, props, propName) => {
    try {
        const user = await getUserFromToken(req)
        checkUserExists(user, res);
        const updateData = {$set: {[propName]: props[propName]}};
        const updatedUser = await User.updateOne({_id: user._id}, updateData);
        if (updatedUser.n === 0) {
            return res.status(404).json({message: 'User not found'});
        }
        return true
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }//d
};
const updateProfile = async (req, res, propName) => {
    const dataToUpdate = req.body;
    const updated = await updateProps(req, res, dataToUpdate, propName);
    if (updated) {
        return res.status(200).json({state: true});
    }
};


let verifyCodes = {}
const userControl = {
    sendVerificationCode: async (req, res) => {
        try {
            const {email} = req.body
            const verifyCode = Array.from({length: 6}, () =>
                Math.floor(Math.random() * 10)
            ).join("");
            verifyCodes[email] = verifyCode;
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.REACT_APP_NODEMAILER_USER,
                    pass: process.env.REACT_APP_NODEMAILER_PASS,
                },
            });
            const mailOptions = {
                from: process.env.REACT_APP_NODEMAILER_USER,
                to: email,
                subject: "인증 코드",
                text: `인증 코드는 : ${verifyCode} 입니다.`,
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json({state: true});
        } catch (error) {
            res.status(400)
        }
    },
    verifyCode: (req, res) => {
        const {email, verificationCode} = req.body;
        const state = verifyCodes[email] === verificationCode
        res.status(200).json({state: state})
    },
    registerSimpleUser: async (req, res) => {
        try {
            const {name, email, password} = req.body;
            const hashPass = await bcrypt.hash(password, 10);
            const simpleNewUser = new User({
                name,
                email,
                password: hashPass,
            })
            await simpleNewUser.save();
            res.status(200).send('User saved to database');
        } catch (e) {
            res.status(400).send(e);
        }
    },
    registerDetailUser: async (req, res) => {
        try {
            const {name, email, password, sex, area, height, weight, age, exercise, wishList} = req.body;
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: hashPass,
                sex,
                area,
                height,
                weight,
                age,
                exercise,
                wishList,
            });
            await newUser.save();
            res.status(200).send('User saved to database');
        } catch (error) {
            res.status(400).send(error);
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body.form

            let user = await User.findOne({email: email})
            if (!user) return res.status(401).json({message: 'Invalid email'})

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(402).json({message: 'Invalid password'})

            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                name: user.name,
                currentTime: Math.floor(Date.now() / 1000)
            }, process.env.REACT_APP_JWT_SECRET)

            user={
                _id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                area: user.area,
                weight: user.weight,
                height: user.height,
                exercise: user.exercise,
                wishList: user.wishList,
                followers: user.followers,
                following: user.following,
                goal: user.goal,
                setting: user.setting,
            }
            return res.status(200).json({token, user})
        } catch (err) {
            console.error(err)
            return res.status(500).json({message: `Internal Server Error`})
        }
    },
    getUserFullInfo: async (req, res) => {
        try {
            const user = await getUserFromToken(req)
            checkUserExists(user, res);
            // console.log(user)
            res.status(200).json(user);
        } catch (error) {
            console.error(error)
            res.status(401).json({message: 'Invalid token'});
        }
    },
    getRecommendUsers: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);
            const followingIds = await User.find(
                {_id: user._id},
                {following: 1}
            ).lean();
            const followingUserIds = followingIds.length > 0 ? followingIds[0].following : [];
            const recommendedUsers = await User.find({
                _id: {$ne: user._id, $nin: followingUserIds},
            });
            res.status(200).json({recommendedUsers});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    followUser: async (req, res) => {
        const {userIdToFollow} = req.body
        try {
            const user = await getUserFromToken(req)
            checkUserExists(user, res);
            const userToFollow = await User.findById(userIdToFollow);
            if (!userToFollow) return res.status(404).json({message: 'User to follow not found'});

            if (user.following.includes(userIdToFollow)) return res.status(400).json({message: 'User is already being followed'});

            user.following.push(userIdToFollow);
            userToFollow.followers.push(user._id);

            await user.save();
            await userToFollow.save();

            const followingUsers = await User.find({_id: {$in: user.following}});
            const followingNames = followingUsers.map((user) => [user._id, user.name, user.email]);

            res.status(200).json({following: user.following, followingNames: followingNames});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    getUnfollow: async (req, res) => {
        const {friend} = req.body
        try {
            const user = await getUserFromToken(req)
            checkUserExists(user, res);
            const userToUnfollow = await User.findById(friend);

            if (!userToUnfollow) return res.status(404).json({message: 'User to unfollow not found'});
            if (!user.following.includes(friend)) return res.status(400).json({message: 'User is not being followed'});

            await User.updateOne({_id: user._id}, {$pull: {following: friend}});
            await User.updateOne({_id: friend}, {$pull: {followers: user._id}});

            const updatedUser = await User.findById(user._id);

            const followingUsers = await User.find({_id: {$in: updatedUser.following}});
            const followingNames = followingUsers.map((user) => [user._id, user.name, user.email]);

            res.status(200).json({f: friend, following: updatedUser.following, followingNames: followingNames})
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    initialFollower: async (req, res) => {
        const {userId} = req.body
        try {
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({message: 'User not found'});
            user.followers = [];
            await user.save();
            res.json({msg: 'success', name: user.name, followers: user.followers});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    goalSetting: async (req, res) => {
        try {
            const user = await getUserFromToken(req)
            checkUserExists(user, res);

            const data = req.body;
            user.goal = {
                dDay: data.userGoal.dDay,
                goals: data.userGoal.goals
            }
            await user.save();
            res.status(200).json({mgs: 'success'});

        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    initialGoal: async (req, res) => {
        try {
            const user = await getUserFromToken(req)
            checkUserExists(user, res);

            const updatedUser = await User.findByIdAndUpdate(user._id, {$set: {goal: null}}, {new: true});
            res.status(200).json({user: updatedUser});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    getFollowing: async (req, res) => {
        const {following} = req.body;
        try {
            const user = await getUserFromToken(req)
            checkUserExists(user, res);

            const followingUsers = await User.find({_id: {$in: following}});
            const followingNames = followingUsers.map((user) => [user._id, user.name, user.email]);

            res.status(200).json({following: followingNames});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    getFollowers: async (req, res) => {
        const {followers} = req.body;
        try {
            const user = await getUserFromToken(req)
            checkUserExists(user, res);

            const followerUsers = await User.find({_id: {$in: followers}});
            const followerNames = followerUsers.map((user) => [user._id, user.name, user.email]);

            res.status(200).json({followers: followerNames});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    updateProfile: async (req, res) => {
        const {name, email} = req.body;
        const nameUpdated = await updateProps(req, res, {name}, 'name');
        const emailUpdated = await updateProps(req, res, {email}, 'email');
        if (nameUpdated && emailUpdated) {
            res.status(200).json({state: true});
        }
    },
    updateInformation: async (req, res) => {
        const {item} = req.body;
        await updateProfile(req, res, item)
    },
    isPasswordCorrect: async (req, res) => {
        try {
            const user = await getUserFromToken(req)
            checkUserExists(user, res);

            const {password} = req.body;
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            res.status(200).json({state: isPasswordCorrect});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    },
    updatePassword: async (req, res) => {
        const {newPassword} = req.body;
        const password = await bcrypt.hash(newPassword, 10);
        await updateProps(req, res, {password}, 'password');
        res.status(200).json({state: true, newPassword: newPassword})
    },
    uploadPost: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const {fileName, content} = req.body

            // console.log(fileName, content)
            const newPost = {
                image: fileName, // 이미지 파일 이름
                content: content,
            }
            user.post.push(newPost)
            await user.save();
            res.status(200).json({message: 'Post uploaded successfully'});
        } catch (e) {
            console.error(e)
        }
    },
    initialUserPost: async (req, res) => {
        try {
            const {userId} = req.body
            const postUser = await User.findById(userId).populate('post');
            postUser.post = []
            await postUser.save();
            res.json({post: postUser})
        } catch (error) {
            console.error(error)
        }
    },
    getPosts: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const followingUserIds = user.following;
            const followingPosts = await User.aggregate([
                {$match: {_id: {$in: followingUserIds}}},
                {$unwind: '$post'},
                {$sort: {'post.date': -1}},
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        'post.image': 1,
                        'post.likes': 1,
                        'post.comments': 1,
                        'post.date': 1,
                        'post.content': 1,
                        'post._id': 1
                    }
                }
            ]);
            res.status(200).json(followingPosts);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },
    getMyPosts: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);
            const myPosts = await User.aggregate([
                {$match: {_id: user._id}},
                {$unwind: '$post'},
                {$sort: {'post.date': -1}},
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        'post.image': 1,
                        'post.likes': 1,
                        'post.comments': 1,
                        'post.date': 1,
                        'post.content': 1,
                        'post._id': 1
                    }
                }])
            res.status(200).json(myPosts);

        } catch (e) {
            console.error(e)
        }
    },
    deleteMyPost: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const {postId} = req.params;
            const postUser = await User.findById(user._id).populate('post');
            const post = postUser.post.find(p => p._id.toString() === postId);
            if (!post) return res.status(404).json({message: 'Post not found'});

            const indexOfPost = postUser.post.indexOf(post);
            postUser.post.splice(indexOfPost, 1);
            await postUser.save();

            // console.log(indexOfPost)
            return res.status(200).json({message: 'Post deleted successfully'});
        } catch (e) {
            console.error(e)
        }
    },
    updateMyPost: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const {postId} = req.params;
            const {content} = req.body;

            const post = user.post.find(post => post._id.toString() === postId);
            // console.log(post, postId, content)
            post.content = content
            await user.save();

            res.status(200).json({msg: 'success'})
        } catch (e) {
            console.error(e)
            res.status(500).json(e)
        }

    },
    updateUserExerciseAttain: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const {exercise, attain} = req.body;

            const exerciseGoal = user.goal.goals.find(goal => goal.label === exercise);
            if (!exerciseGoal) return res.status(404).json({message: 'EveryExercises goal not found'});

            exerciseGoal.attain = attain;
            await user.save();

            return res.status(200).json({message: 'Attain value updated successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },
    postComment: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const {userId, postId, content} = req.body;

            const postUser = await User.findById(userId).populate('post');
            if (!user) return res.status(404).json({message: 'User not found'});

            const post = postUser.post.find(p => p._id.toString() === postId);
            if (!post) return res.status(404).json({message: 'Post not found'});

            const newComment = {
                user: user.name,
                userId: user._id,
                content: content,
            }
            post.comments.push(newComment);
            await postUser.save();

            res.status(200).json({message: 'Comment posted successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },
    deletePostComment: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const {userId, postId, commentId} = req.params
            const userPost = await User.findById(userId).populate('post');
            if (!userPost) return res.status(404).json({message: 'User not found'});

            const post = userPost.post.find(p => p._id.toString() === postId);
            if (!post) return res.status(404).json({message: 'Post not found'});

            const comment = post.comments.find(c => c._id.toString() === commentId);
            if (!comment) return res.status(404).json({message: 'Comment not found'});

            const indexOfComment = post.comments.indexOf(comment);
            post.comments.splice(indexOfComment, 1);
            await userPost.save();

            res.status(200).json({msg: 'success'})


        } catch (e) {
            console.error(e)
        }

    },
    initialUserPostComment: async (req, res) => {
        try {
            const {userId, postId} = req.body;

            const postUser = await User.findById(userId).populate('post');
            if (!postUser) return res.status(404).json({message: 'User not found'});

            const post = postUser.post.find(p => p._id.toString() === postId);
            if (!post) return res.status(404).json({message: 'Post not found'});

            post.comments = [];
            await postUser.save();
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Internal server error'});
        }
    },
    postHeart: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const {userId, postId} = req.body;
            const postUser = await User.findById(userId).populate('post');
            if (!postUser) return res.status(404).json({message: 'User not found'});

            const post = postUser.post.find(p => p._id.toString() === postId);
            if (!post) return res.status(404).json({message: 'Post not found'});

            const indexOfName = post.likes.indexOf(user.name);
            indexOfName !== -1 ? post.likes.splice(indexOfName, 1) : post.likes.push(user.name);
            await postUser.save();

            res.status(200).json({mgs: 'success'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },
    getFollowersExercisesStatus: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const followingUserIds = user.following;
            const followingUsers = await User.find({_id: {$in: followingUserIds}});

            const followingUsersExerciseStatus = followingUsers.map(user => {
                const {name, goal, _id} = user;
                return {
                    _id,
                    name,
                    goal
                }
            })
            // console.log(user)
            res.status(200).json({followingUsersExerciseStatus});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },
    getOtherUserInfo: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);
            const {userId} = req.params;

            let userInfo = await User.findById(userId)
            console.log(userInfo.setting)
            const isPublic = userInfo.setting

            userInfo = {
                name: userInfo.name,
                email: userInfo.email,
                followers: isPublic.isFollowPublic ? userInfo.followers : null,
                following: isPublic.isFollowPublic ? userInfo.following : null,
                age: isPublic.isAgePublic ? userInfo.age : null,
                area: isPublic.isAreaPublic ? userInfo.area : null,
                weight: isPublic.isWeightPublic ? userInfo.weight : null,
                height: isPublic.isHeightPublic ? userInfo.height : null,
                exercise: isPublic.isExercisePublic ? userInfo.exercise : null,
                wishList: isPublic.isWishListPublic ? userInfo.wishList : null,
                post: isPublic.isPostPublic ? userInfo.post : [],
            }
            res.status(200).json(userInfo)

        } catch (e) {
            console.error(e)
        }
    },
    getOtherUserFollowersFollowing: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);
            const {follow} = req.body;

            const followList = await User.find({_id: {$in: follow}});
            const followInfos = followList.map((user) => [user._id, user.name, user.email]);

            res.status(200).json({followInfos})
        } catch (e) {
            console.error(e)
        }
    },
    updateInformationPublic: async (req, res) => {
        try {
            const user = await getUserFromToken(req);
            checkUserExists(user, res);

            const {isPublic, item} = req.body;

            user.setting[item] = isPublic
            await user.save()
            res.status(200).json({msg: 'success'})
        } catch (e) {
            console.error(e)
        }
    }


}

module.exports = userControl