const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    // ref: 'User',
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String
}, {
    timestamps: true
});
const message = mongoose.model('Message',messageSchema)
module.exports = message