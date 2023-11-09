const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.sendStatus(403); // 사용자 정보 없음
      }
  
      const roles = [].concat(allowedRoles);
      if (roles.includes(req.user.role)) {
        next(); // 권한 있음
      } else {
        res.sendStatus(401); // 권한 없음
      }
    };
  };
  
  module.exports = authorizeRoles;  