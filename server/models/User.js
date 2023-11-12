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
        type: String, // 노인인지 보호자인지
        required: true
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
        Clap: {
            type: Boolean
        },
        Smile: {
            type: Boolean
        },
        Exercise: {
            type: Boolean
        },
        WordChain: {
            type: Boolean
        }
    }],
    Gaurd: {
        GaurdName: {
            type: String
        },
        GuardID: {
            type: String
        },
        GuardPW: {
            type: String
        },
        GuardPhone: {
            type: String
        },
        UserType: {
            type: String
        },
        RelationshipWithSilver: {
            type: String
        },
        SilverID: {
            type: String
        },
        SilverPW: {
            type: String
        },
        Notice_hasCompleted: { // 미션 완료 시 푸쉬 알림 여부
            type: Boolean
        },
        Notice_ifNon: { // 감지 없을 시 푸쉬 알림 여부
            type: Boolean
        },
        Device_token: { // FCM 디바이스 토큰
            type: String
        }
    },
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