//패키지 임포트
const createError = require('http-errors');
const express = require('express');
const app = express();
const debug = require('debug')('server:server');
const http = require('http');
const {Server} = require("socket.io")

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const mongoose = require('mongoose')
require('dotenv').config()


//CORS 옵션
let corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:3000/api',
        'https://pose2team.vercel.app'
    ],
    methods: ["GET", "POST","PUT", "DELETE"],
    credentials: true
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//몽고db셋업
mongoose.Promise = global.Promise
dbUrl = process.env.REACT_APP_MONGODB_URL
mongoose.connect(dbUrl, {useNewUrlParser: true})
mongoose.set('strictQuery', false)
const db = mongoose.connection
//d
db.on('connected', function () {
    console.log('server connected')
})
db.on('error', console.error)
db.on('open', function () {
    console.log('connected to mongo server ' + dbUrl)
})
db.on('disconnect', function () {
    console.log('disconnected from mongo server' + dbUrl)
})


//db 컬렉션 임포트
require('./models/user')
require('./models/index')
require('./models/team')

//라우터 임포트
const indexRouter = require('./routes/indexs');
const usersRouter = require('./routes/users');
const teamRouter = require('./routes/teams');

//라우터 설정
app.use('/index', indexRouter);
app.use('/user', usersRouter);
app.use('/team', teamRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);
// http.listen(port, () => console.log(`Listening on port ${port}`));
const server = http.createServer(app);
server.listen(port, () => console.log(`server on ${port}`));
server.on('error', onError);
server.on('listening', onListening);
server.on('listening', function () {
        console.log('Express server listening on port ' + port);
    }
)

const io = new Server(server
    , {
        path: '/chat',
        cors: {
            origin: [
                'http://localhost:3000',
                'https://pose2team.vercel.app']
        },
    }
);

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data)
    });
});

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

// module.exports = app;
