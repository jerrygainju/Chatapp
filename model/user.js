const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
        // _id: Schema.Types.ObjectId,
        name:{
             type: String,
        } 
    });
    const user = mongoose.model('User',userSchema)
    module.exports = user