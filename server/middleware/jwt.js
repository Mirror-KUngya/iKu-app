require("dotenv").config();
const jwt = require("jsonwebtoken");
// 최초 로그인을 했을 때 accessToken과 refreshToken을 발급
const jwtToken = () => {
    return{
        access(id) {
            return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: "15min",
            });
        },
        refresh(id) {
            return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "180days",
            });
        }
    }
}