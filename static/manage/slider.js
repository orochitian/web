$(function () {
    // 文件上传框
    var $uploader = $('#uploader');
    $uploader.fileinput({
        uploadUrl: 'http://127.0.0.1:8080/test',
        language : 'zh',
        allowedPreviewTypes : [ 'image' ],
        allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
        maxFileSize : 2000,
        maxFilesNum : 1,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        overwriteInitial: false,
        msgUploadError : '上传失败',
        autoReplace : true,
        showUpload : false,
        layoutTemplates : {
            actionDelete : '',
            actionUpload : ''
        }
    });
    $uploader.on('fileuploaded', function (event, data, previewId, index) {
        $('#addCategory').find('[name="imgPath"]').val(data.response.path);
        $('#addCategory').find('[name="imgName"]').val(data.response.name);
        $('#addCategory').find('[name="imgSize"]').val(data.response.size);
        setTimeout(function () {
            $('#addCategory').submit();
        }, 500);
    });
    $uploader.on('filecleared', function () {
        $uploader.trigger('change');
    });
    $('.btn-info:submit').on('click', function (e) {
        e.preventDefault();
        $uploader.fileinput('upload');
    });
    //  关闭刷新整个模态框
    $('#add-modal').on('hidden.bs.modal', function () {
        var $this = $(this);
        $this.find('[name="title"]').val('')
        $this.find('[name="describe"]').val('')
        $this.find('#uploader').fileinput('unlock').fileinput('clear');
    });

    //  添加轮播
    $.fn.addCategory = function (url) {
        return this.click(function () {
            $('#add-modal').modal({
                backdrop : 'static'
            });
        });
    }
    //  编辑分类
    $.fn.editCategory = function (url) {
        var $modal = $('#edit-modal');
        return this.on('click', function () {
            var $this = $(this);
            $modal.find('[name="name"]').val( $this.attr('name') );
            $modal.find('[name="describe"]').val( $this.attr('describe') );
            $modal.find('[name="password"]').val( $this.attr('password') );
            $modal.find('[name="id"]').val( $this.attr('id') );
            $modal.modal({
                backdrop : 'static'
            });
            $('#editCategory').remote(url);
            return false;
        });
    }
    $('.add-btn').addCategory();
    $('.edit-btn').editCategory();

    $('.delete-btn').click(function () {
        var href = $(this).attr('href');
        layer.confirm('删除分类会清空该分类下的所有文章。<br>确认删除？', {
            title : ['警告！', 'font-size:18px; color:#CC6633;'],
            move : false,
            area : '400px'
        }, function () {
            window.location.href = href;
        });
        return false;
    });
});