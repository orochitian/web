$(function () {
    $('.mood-add').click(function () {
        $('#add-modal').modal({
            backdrop : 'static'
        });
    });
    $('.mood-edit').click(function () {
        $modal = $('#edit-modal');
        $modal.find('[name="mid"]').val( $(this).attr('mid') );
        $modal.find('[name="text"]').val( $(this).attr('text') );
        $modal.modal({
            backdrop : 'static'
        });
    });
    $('.delete-btn').click(function () {
        var href = $(this).attr('href');
        layer.confirm('删除该心情后无法恢复。<br>确认删除？', {
            title : ['警告！', 'font-size:18px; color:#CC6633;'],
            move : false,
            area : '400px'
        }, function () {
            window.location.href = href;
        });
        return false;
    });
});
