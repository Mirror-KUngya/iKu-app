const mysql = require('mysql2');
var connection = {
    host:'127.0.0.1',
    port:'3306',
    user:'mirrorkungya',
    password:'iku1111',
    database:'iku_db'
};

module.exports = {
    init: function () {
        return mysql.createConnection(connection);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql 연결 에러 : ' + err);
            else console.log('mysql 연결 성공');
        });
    }
};