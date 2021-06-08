const mysql = require('mysql');
const SQLConfig_test = {
    host: 'rm-2zex5h4lnktr554is.mysql.rds.aliyuncs.com',
    user: 'quanan50jia',
    password: 'Quanan@50Jia',
    database: 'ouhao-new'
}

const SQLConfig_releace = {
    host: 'rm-2zekwru17jet1tan71o.mysql.rds.aliyuncs.com',
    user: 'quanan50jia',
    password: 'Quanan@50Jia',
    database: 'ouhao-website-release'
}

const SQLPool = mysql.createPool(process.env.NODE_ENV === 'development' ? SQLConfig_test : SQLConfig_releace)

module.exports.SQLPool = SQLPool