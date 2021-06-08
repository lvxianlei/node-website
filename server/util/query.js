const { SQLPool } = require('../config');
const moment = require('moment')
const ossURL = 'https://ouhao-website.oss-cn-beijing.aliyuncs.com/'
function query(SQL) {
    if (!SQL) {
        console.error('Error: SQL语句不能为空！')
    }
    return new Promise((resolve, reject) => {
        SQLPool.getConnection((err, connection) => {
            if (err) {
                console.error("SQLPool ERROR:" + err)
                reject(err)
            } else {
                connection.query(SQL, (error, data) => {
                    if (error) {
                        console.error("CONNECTION ERROR:" + error.message)
                        reject(error.message)
                    } else {
                        resolve(data)
                        connection.release()
                        // SQLPool.end()  关闭连接池
                    }
                })
            }
        })
    })
}

function dateFormat(date) {
    const formatDate = moment(date).format('YYYY-MM-DD')
    let data_date = moment(formatDate).add(0, 'year').format('LL').replace(',', '')
    data_date = data_date.split(' ').map((item, index) => index === 0 ? item.slice(0, 3) : item).join(' ').split(' ')
    data_date = data_date[1] + ' ' + data_date[0] + ' ' + data_date[2]
    return data_date
}

function urlFormat(data) {
    if (data === null || !data) { return '' }
    const urlArr = data.split('/')
    return urlArr[0].includes('http') ? data : ossURL + data
}

function isMobile(userAgent) {
    let flag = false
    const terminalList = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
    for (let i = 0; i < terminalList.length; i++) {
        if (userAgent.indexOf(terminalList[i]) > -1) {
            flag = true;
            break
        }
    }
    return flag
}

module.exports.query = query
module.exports.dateFormat = dateFormat
module.exports.urlFormat = urlFormat
module.exports.isMobile = isMobile