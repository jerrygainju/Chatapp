const express =  require('express');
const { dirname } = require('path');
const { Socket } = require('socket.io');
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose');
const User = require('./model/user')
const Message = require('./model/message')



mongoose.connect ('mongodb://localhost:27017/chatapp', { useNewUrlParser : true, useUnifiedTopology: true });

db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', function (){
    console.log('connected to mongoose')
});

// const newmsg = db.collection('messages');

// const newM = new message({
//     message: 'sssss'
// });

// newM.save();

const user = new User({
    name: 'hero'
});
user.save();

Message.create(
    { userId: user._id, message: '99999'},
 (err, results) => {

});
Message.find({}, (e,r) => {
    console.log('result', r)
}).populate('userId')





app.use(express.static(__dirname + '/public'))

app.get('/',(req, res)=> {
    res.sendFile(__dirname + '/first.html');
});


//socket
const io = require('socket.io')(http)


io.on('connection', (socket) => {
    console.log('Connected..')
    socket.on('message',(msg) => {
        socket.broadcast.emit('message',msg)
    })
})
const port = process.env.PORT || 3000;
app.listen(port, console.log(`listening on port ${port}...`))


