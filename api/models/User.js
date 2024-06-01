const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    roles: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: "Role"
    }
});

module.exports =  mongoose.model("User", userSchema);
