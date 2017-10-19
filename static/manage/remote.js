$.fn.remote = function (url, data) {
    var validOption = {
        trigger : 'change',
        //  验证字段
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: '分类名称不能为空。'
                    },
                    remote: {
                        url: url,
                        message: "分类已存在。",
                        type: "post",
                        dataType: 'json',
                        data : data || {},
                        delay: 500,
                    }
                }
            }
        }
    }
    return this.bootstrapValidator(validOption);
}
