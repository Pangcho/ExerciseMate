const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://competitive-leticia-danciingqueen.koyeb.app' // 배포된 서버 주소
    : 'http://localhost:3001' // 로컬 서버 주소

const API={
    //서버통신
    //로그인
    LOGIN: `${API_BASE_URL}/user/login`,
    GET_USER_FULL_INFO: `${API_BASE_URL}/user/getUserFullInfo`,
    GET_FOLLOWERS_EXERCISES_STATUS: `${API_BASE_URL}/user/getFollowersExercisesStatus`,
    GET_JOINED_TEAM_INFO: `${API_BASE_URL}/team/getJoinedTeamInfo`,

    //회원가입
    SEND_VERIFY_CODE: `${API_BASE_URL}/user/sendVerificationCode`,
    VERIFY_CODE: `${API_BASE_URL}/user/verifyCode`,
    REGISTER_SIMPLE_USER: `${API_BASE_URL}/user/registerSimpleUser`,
    REGISTER_DETAIL_USER: `${API_BASE_URL}/user/registerDetailUser`,

    //추천 유저
    GET_RECOMMEND_USER: `${API_BASE_URL}/user/getRecommendUsers`,
    //게시물 업로드
    UPLOAD_USER_POST: `${API_BASE_URL}/user/uploadPost`,
    //팔로잉하는 유저들의 게시물 가져오기
    GET_POSTS: `${API_BASE_URL}/user/getPosts`,
    //내 게시물 가져오기
    GET_MY_POSTS: `${API_BASE_URL}/user/getMyPosts`,
    //이미지 경로
    GET_IMAGE: `https://competitive-leticia-danciingqueen.koyeb.app/api`,
    //댓글 입력
    POST_USER_POST_COMMENT: `${API_BASE_URL}/user/postUserPostComment`,
    //댓글 삭제
    DELETE_USER_POST_COMMENT: `${API_BASE_URL}/user/deleteUserPostComment`,
    //좋아요 클릭
    POST_USER_POST_HEART: `${API_BASE_URL}/user/postUserPostHeart`,
    //내 게시물 삭제
    DELETE_MY_POST: `${API_BASE_URL}/user/deleteMyPost`,
    //내 게시물 내용 수정
    UPDATE_MY_POST: `${API_BASE_URL}/user/updateMyPost`,

    //메이트 팀
    //팀 생성
    CREATE_TEAM: `${API_BASE_URL}/team/createTeam`,
    //팀 목록
    GET_ALL_TEAMS: `${API_BASE_URL}/team/getAllTeams`,
    //팀 가입
    JOIN_TEAM: `${API_BASE_URL}/team/joinTeam`,
    //가입한 팀 목록
    GET_JOINED_TEAMS: `${API_BASE_URL}/team/getJoinedTeams`,
    //팀 정보
    GET_TEAM_INFO: `${API_BASE_URL}/team/getTeamInfo`,
    //팀 탈퇴
    QUIT_TEAM: `${API_BASE_URL}/team/quitTeam`,
    //팀 공지 등록
    POST_TEAM_NOTICE: `${API_BASE_URL}/team/postTeamNotice`,
    //팀 공지 가져오기
    GET_TEAM_NOTICE: `${API_BASE_URL}/team/getTeamNotice`,
    //팀 공지 게시글 삭제
    DELETE_TEAM_NOTICE: `${API_BASE_URL}/team/deleteTeamNotice`,
    //팀 공지 게시글 수정
    UPDATE_TEAM_NOTICE: `${API_BASE_URL}/team/updateTeamNotice`,
    //팀 게시판 등록
    POST_TEAM_BOARD: `${API_BASE_URL}/team/postTeamBoard`,
    //팀 게시판 게시글 삭제
    DELETE_TEAM_BOARD: `${API_BASE_URL}/team/deleteTeamBoard`,
    //팀 게시판 게시글 수정
    UPDATE_TEAM_BOARD: `${API_BASE_URL}/team/updateTeamBoard`,
    //팀 게시판 가져오기
    GET_TEAM_BOARD: `${API_BASE_URL}/team/getTeamBoard`,
    //팀 게시판 댓글 등록
    POST_TEAM_BOARD_COMMENT: `${API_BASE_URL}/team/postTeamBoardComment`,
    //팀 자유게시판 댓글 삭제
    DELETE_TEAM_FREE_BOARD_COMMENT: `${API_BASE_URL}/team/deleteTeamBoardComment`,
    //팀 회원 목록
    GET_TEAM_MEMBERS: `${API_BASE_URL}/team/getTeamMembers`,
    //팀 회원 운동상태
    GET_TEAM_MEMBERS_EXERCISE_STATUS: `${API_BASE_URL}/team/getTeamMembersExerciseStatus`,

    //유저 팔로우
    FOLLOW_USER: `${API_BASE_URL}/user/followUser`,

    //특정 유저 정보 페이지
    GET_OTHER_USER_INFO: `${API_BASE_URL}/user/getOtherUserInfo`,
    //특정 유저 팔로워, 팔로잉 목록
    GET_OTHER_USER_FOLLOWERS_FOLLOWING: `${API_BASE_URL}/user/getOtherUserFollowersFollowing`,

    //유저의 운동 목표 설정
    GOAL_SETTING: `${API_BASE_URL}/user/goalSetting`,
    //운동 목표 초기화
    INITIAL_GOAL: `${API_BASE_URL}/user/initialGoal`,
    //운동 기록 업데이트
    UPDATE_ATTAIN: `${API_BASE_URL}/user/updateUserExerciseAttain`,

    //유저의 팔로워, 팔로잉 목록
    GET_FOLLOWERS:`${API_BASE_URL}/user/getFollowers`,
    GET_FOLLOWING:`${API_BASE_URL}/user/getFollowing`,
    //언팔
    GET_UNFOLLOW:`${API_BASE_URL}/user/getUnfollow`,

    //유저 정보 수정
    UPDATE_PROFILE:`${API_BASE_URL}/user/updateProfile`,
    UPDATE_INFORMATION:`${API_BASE_URL}/user/updateInformation`,
    IS_PASSWORD_CORRECT:`${API_BASE_URL}/user/isPasswordCorrect`,
    UPDATE_PASSWORD:`${API_BASE_URL}/user/updatePassword`,
    CHANGE_INFORMATION_PUBLIC:`${API_BASE_URL}/user/changeInformationPublic`,
    UPDATE_INFORMATION_PUBLIC:`${API_BASE_URL}/user/updateInformationPublic`,

    //채팅
    CHATTING:`${API_BASE_URL}`,





    //----------------------------------------------------------------------------------
    //URL
    //회원가입
    NEW_USER: '/register',
    USER_DETAIL:'/userdetail',
    USER_DETAIL_2:'/userdetail2',
    USER_DETAIL_3:'/userdetail3',

    //네비게이션
    SELECTED_EXERCISE:'/exercise/selected',
    WISH_EXERCISE:'/exercise/wishexercise',

    //운동
    EXERCISE:'/exercise',
    GOAL:'/exercise/goal',
    TRAINING:'/exercise/training',


    //운동상태
    CURRENT:'/exercise/current',

    //랭킹
    RANKING:'/ranking',

    //메이트
    MATE:'/mate',
    //추천 유저
    RECOMMEND_USER:'/recommendUser',
    //게시물 업로드
    UPLOAD_POST:'/uploadPost',
    //내 게시물 보기
    MY_POSTS:'/myPosts',
    //메이트 팀 만들기
    CREATE_MATE_TEAM:'/createMateTeam',
    //메이트 팀 목록
    MATE_TEAM_LIST:'/mateTeamList',
    //팀 입장
    ENTER_TEAM:'/enterTeam',
    //팀 공지
    TEAM_NOTICE:'/teamNotice',
    //팀 게시판
    TEAM_BOARD:'/teamBoard',
    //팀 운동
    TEAM_EXERCISE:'/teamExercise',
    //팀 채팅
    TEAM_CHAT:'/teamChat',
    //팀 회원
    TEAM_MEMBERS:'/teamMembers',
    //팀 세부 정보
    TEAM_DETAIL:'/teamDetail',

    //계정
    USER_SETTING:'/usersetting',
    ACCOUNT:'/account',

    //유저 정보
    USER_INFORMATION:'/userInformation',

}

module.exports = API;
