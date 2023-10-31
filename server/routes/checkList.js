const express = require("express");
const router = express.Router();
const userR = require("./user");
const CheckList = require("../models/CheckList");
const userID = userR.nowID;

// 체크리스트 조회
router.get("/", async (req, res) => {
    const { UserID } = req.body;
    try {
        let checkList = CheckList.findOne({ UserID });
        if (!checkList) {
            console.log("ID doesn't exist.");
            return res.status(400).json({ "message": "ID doesn't exist." });
        }
        return res.status(200).json({ checkList });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error")
    }
});

// 체크리스트 항목 추가
router.post("/", async (req, res) => {
    const { UserID, newCheck } = req.body;
    try {
        let checkList = CheckList.findOne({ UserID });
        if (!checkList) {
            console.log("ID doesn't exist.");
            return res.status(400).json({ "message": "ID doesn't exist." });
        }
        // 항목 추가 (필드 추가)
        checkList.updateMany({}, { $set: { newCheck: 0 } }, (err, res) => {
            if (err) throw err;
            console.log('Fields added', res);
            return res.status(200).json({"newCheck":newCheck});       
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Server Error")
    }
});

// 채크리스트 항목 삭제
router.delete("/", async (res, req) => {

});

module.exports = router;