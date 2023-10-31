const express = require("express");
const userR = require("./user");
const User = require("../models/User");
const date = require("../config/date");
const userID = userR.nowID;
const router = express.Router();

// mission 날짜별로 조회
// mission 날짜 조회 시 예외 발생 시 해당 날짜 data 삽입
// res에 날짜, 미션 완료 여부
router.get("/", async (req, res) => {
    const { UserID, MissionDate } = req.body;

    try {
        const user = await User.findOne({ "UserID": UserID, "Mission.MissionDate": MissionDate });

        // 해당 날짜 미션 정보 없으면 default값으로 미션 정보 생성
        if (!user) {
            User.updateOne({ UserID: user.UserID }, {
                $push: {
                    Mission: {
                        MissionDate: date.formatDate(),
                        Smile: false,
                        Game: false,
                        Exercise: false,
                        Movement: false
                    }
                }
            })
        }
        console.log(user.Mission)
        return res.status(201).json(user.Mission);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
});

// 미션 완료한 거 수정
router.put("/:mission", async (req, res) => {
    const { UserID, MissionDate } = req.body;
    const complete = req.params.mission;
    try {
        let mission = await Mission.findOne({ UserID, MissionDate });

        if (!mission) {
            return res.status(400);
        }
        // 미션 완료한 거 수정
        mission.updateOne({ complete: true });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;
