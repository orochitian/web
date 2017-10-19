$.fn.remote = function (url) {
    var baseUrl = '/manage/story';
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
                        url: baseUrl + url,
                        message: "分类已存在。",
                        type: "post",
                        dataType: 'json',
                        delay: 500,
                    }
                }
            }
        }
    }
    return this.bootstrapValidator(validOption);
}
$('#addCategory').remote('/storyAddCategoryExists');

$('.edit-btn').click(function () {

    $('#editCategory').remote('/storyEditCategoryExists');
});
