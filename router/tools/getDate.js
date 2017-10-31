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
            info ? dateStr += date.getMonth()+1 + info : dateStr += date.getMonth()+1 + '月';
        },
        dd : function (date) {
            info ? dateStr += date.getDate() + info : dateStr += date.getDate() + '日';
        }
    }
    for( i=0; i<formatArr.length; i++ ) {
        formatFn[formatArr[i]](date);
    }
    if( info ) {
        dateStr = dateStr.substr(0, dateStr.length-1)
    }
    return dateStr;
}
module.exports = getDate;
