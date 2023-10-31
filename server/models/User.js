const mongoose = require("mongoose")

// Schema 생성
const UserSchema = new mongoose.Schema({
    UserName: {
        type: String
    },
    UserPhone: {
        type: String
    },
    UserAddress: {
        type: String
    },
    UserID: {
        type: String,
        unique: true,
        required: true
    },
    UserPW: {
        type: String,
        required: true
    },
    BirthYear: {
        type: Number,
        required: true,
    },
    BirthMonth: {
        type: Number,
        required: true,
    },
    BirthDay: {
        type: Number,
        required: true,
    },
    UserType: {
        type: Number
    },
    GuardPhone: {
        type: String
    },
    Relationship: {
        type: String
    },
    Mission: [{
        MissionDate: {
            type: String,
            unique: true,
            required: true
        },
        Smile: {
            type: Boolean
        },
        Game: {
            type: Boolean
        },
        Exercise: {
            type: Boolean
        },
        Movement: {
            type: Boolean
        }
    }],
    CheckList: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
});

module.exports = User = mongoose.model("Users", UserSchema, "Users")