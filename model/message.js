const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    // ref: 'User',
    userId: {
        type: String,
        ref: 'User'
    },
    message: {
        type: String,
    }
},
 {
    timestamps: true
});
const message = mongoose.model('Message',messageSchema)
module.exports = message