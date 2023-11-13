const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamControllers');


router
    .post('/createTeam', teamController.createMateTeam)
    .get('/getAllTeams', teamController.getAllTeams)
    .post('/joinTeam', teamController.joinTeam)
    .delete('/quitTeam/:teamId', teamController.quitTeam)
    .delete('/deleteTeam/:teamId', teamController.deleteTeam)
    .get('/getJoinedTeams', teamController.getJoinedTeams)
    .get('/getTeamInfo/:teamId', teamController.getTeamInfo)
    .post('/postTeamNotice/:teamId', teamController.postTeamNotice)
    .get('/getTeamNotice/:teamId', teamController.getTeamNotice)
    .delete('/deleteTeamNotice/:teamId/:noticeId', teamController.deleteTeamNotice)
    .put('/updateTeamNotice/:teamId/:noticeId', teamController.updateTeamNotice)
    .post('/postTeamBoard/:teamId', teamController.postTeamBoard)
    .delete('/deleteTeamBoard/:teamId/:boardId', teamController.deleteTeamBoard)
    .put('/updateTeamBoard/:teamId/:boardId', teamController.updateTeamBoard)
    .get('/getTeamBoard/:teamId', teamController.getTeamBoard)
    .post('/postTeamBoardComment/:teamId', teamController.postBoardComment)
    .delete('/deleteTeamBoardComment/:teamId/:boardId/:commentId', teamController.deleteTeamBoardComment)
    .get('/getTeamMembers/:teamId', teamController.getTeamMembers)
    .get('/getTeamMembersExerciseStatus/:teamId', teamController.getTeamMembersExerciseStatus)
    .get('/getJoinedTeamInfo', teamController.getJoinedTeamInfo)

module.exports = router;