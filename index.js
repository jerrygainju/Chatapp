const express =  require('express');
const { dirname } = require('path');
const { Socket } = require('socket.io');
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose');
const User = require('./model/user')
const Message = require('./model/message');
const { get } = require('http');
const { create } = require('./model/user');
const { Console } = require('console');



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


//   const user = new User({});
//         user.save().then(()=>{
//         });

// User.create(
//     { userId: user._id},
//  (err, results) => {

// });
// User.find({ name: 'hero'}), (e,r) => {
//     console.log('result', r)
// })



app.use(express.static(__dirname + '/public'))

app.get('/',(req, res)=> {
    res.sendFile(__dirname + '/first.html');
});


//socket
const io = require('socket.io')(http)


io.on('connection', (socket) => {
    console.log('Connected..')
    socket.on('message',async (msg) => {
       // query user where name = msg.user
       let userId = null;
         const usrgg = await User.findOne({ name:msg.user})
         if(usrgg) {
            userId = usrgg._id;
         } else {
       const ven = await User.create({name:msg.user})
         console.log('ss',ven)
         usrgg = ven._id
         }

         console.log('sss',usrgg)

        // const usr = User.where({ name:msg.user});
        // usr.findOne(function(err, User )
        // {
        //     if (err) return handlError(err);
        //     if(User)
        //     {
        //         console.log(usr)
        //     }
        // })


        // if found get id      
        // else create user whose name msg.user, get new user id

        const mesg = new Message({userId:msg.user,message:msg.message});
        mesg.save().then(()=>{
        });                                                     
        socket.broadcast.emit('message',msg)
    })
})
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


