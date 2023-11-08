const mongoose = require("mongoose")

// Schema 생성
const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    UserPhone: {
        type: String,
        required: true
    },
    UserAddress: {
        type: String,
        required: true
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
        required: true
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
        type: Number,
        required: true
    },
    GuardPhone: {
        type: String,
        required: true
    },
    Relationship: {
        type: String,
        required: true
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
    Notice_hasCompleted: { // 미션 완료 시 푸쉬 알림 여부
        type: Boolean
    },
    Notice_ifNon: { // 감지 없을 시 푸쉬 알림 여부
        type: Boolean
    },
    Device_token: { // FCM 디바이스 토큰
        type: String
    }
});

module.exports = User = mongoose.model("Users", UserSchema, "Users")