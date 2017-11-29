$(function () {
    var category = $('.panel-body').find('[name="category"]').val();
    var $uploader = $('#uploader');
    $.ajax({
        url : '/manage/uploadSource/get',
        type : 'post',
        success : function (data) {
            // 文件上传框
            $uploader.fileinput({
                deleteUrl: '/manage/uploadSource/delete',
                language : 'zh',
                allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
                maxFileSize : 500,
                overwriteInitial : false,
                msgUploadError : '上传失败',
                autoReplace : true,
                showUpload : false,
                showBrowse : false,
                showRemove : false,
                showCaption : false,
                fileActionSettings : {
                    showDrag : false,
                },
                initialPreview : data.images,
                initialPreviewConfig : data.config
            });
            $uploader.on('filebeforedelete', function() {
                return new Promise(function(resolve, reject) {
                    layer.confirm('这是物理删除，且会同时删除磁盘文件。<br>确认删除？', {
                        title : ['警告！', 'font-size:18px; color:#CC6633;'],
                        move : false,
                        area : '400px'
                    }, function () {
                        resolve();
                        layer.closeAll();
                    });
                });
            });
        }
    });

});