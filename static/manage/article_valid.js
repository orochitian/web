$(function () {
    $('#form-valid').bootstrapValidator({
        trigger : 'change',
        //  验证字段
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            title: {
                validators: {
                    notEmpty: {
                        message: '标题不能为空。'
                    }
                }
            },
            content: {
                validators: {
                    notEmpty: {
                        message: '标题不能为空。'
                    }
                }
            }
        }
    });
});
