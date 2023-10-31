const mongoose = require("mongoose")

// Schema 생성
const GuardSchema = new mongoose.Schema({
    GuardName: {
        type: String,
        required: true
    },
    GuardPhone: {
        type: String,
        required: true
    },
    GuardID: {
        type: String,
        unique: true,
        required: true
    },
    GuardPW: {
        type: String,
        required: true
    },
    UserType:{
        type:String,
        required: true
    },
    Relationship: {
        type: String
    },
    UserID: {
        type: String,
        required: true
    },
    UserPW: {
        type: String,
        require: true
    }
})

module.exports = Guard = mongoose.model("guard", GuardSchema)