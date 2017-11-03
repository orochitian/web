//	获取日期
//	参数：
//	1、时间戳  number类型
//	2、时间格式  字符串  默认: 'yy-mm-dd'
//	3、日期截取符号   默认:年 月 日
function getDate (timeStamp, format, info) {
    if( !timeStamp ) {
        return;
    }
    var date = timeStamp;
    var format = format || 'yy-mm-dd';
    var formatArr = format.split('-');
    var dateStr = '';
    var i;
    var formatFn = {
        yyyy : function (date) {
            info ? dateStr += date.getFullYear() + info : dateStr += date.getFullYear() + '年';
        },
        yy : function (date) {
            info ? dateStr += date.getFullYear().toString().substr(2, date.getFullYear().toString().length-1) + info : dateStr += date.getFullYear().toString().substr(2, date.getFullYear().toString().length-1) + '年';
        },
        mm : function (date) {
            var month = date.getMonth()+1;
            if( info ) {
                if( month < 10 ) {
                    dateStr += '0' + month + info;
                } else {
                    dateStr += month + info;
                }
            } else {
                dateStr += month + '月'
            }
        },
        dd : function (date) {
            var day = date.getDate();
            if( info ) {
                if( day < 10 ) {
                    dateStr += '0' + day
                } else {
                    dateStr += day
                }
            } else {
                dateStr += day + '日'
            }
        }
    }
    for( i=0; i<formatArr.length; i++ ) {
        formatFn[formatArr[i]](date);
    }
    return dateStr;
}
module.exports = getDate;
