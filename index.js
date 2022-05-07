const express = require('express');
const cors = require('cors');
const http = require('http')
const { Server } = require('socket.io')

const routerApi = require('./routes');
const path = require('path')
const { checkRoles} = require('./middlewares/auth.handler');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

// Rfid read  post imports
const passport = require("passport");
const validatorHandler = require("./middlewares/validator.handler");
const {postRfidSchema} = require("./schemas/rfid.schema");
const rfidReadPost = require("./routes/rfid.router")

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true}))
app.use(cors({
  origin: '*'
}));
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

require('./utils/auth');

routerApi(app);

// Init socket.io
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

let socketUsers = {}

io.on('connection', (socket) => {
  console.log('Connected')

  socket.on('createRoom', (rfidReaderId) => {
    socket.join(rfidReaderId)
    io.to(socket.id).emit('connected_id', socket.id)
  })

  socket.on('disconnect', () => {
    console.log(`socket ${socket.id} disconnected`);
  })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
});

// Reads endpoint route
app.post('/api/v1/rfid/read',
  passport.authenticate('jwt', {session: false}),
  checkRoles( 'rfid_reader'),
  validatorHandler(postRfidSchema, 'body'),
  async (req, res, next) => {
    await rfidReadPost(req, res, next, io, socketUsers)
  }
)

server.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
