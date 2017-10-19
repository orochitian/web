$(function () {
    $('.add-btn').click(function () {
        $('#add-modal').modal({
            backdrop : 'static'
        });
        $('#addCategory').remote('/manage/story/storyAddCategoryExists');
    });
    var test = $('#editCategory').remote('/manage/story/storyEditCategoryExists')
    $('.edit-btn').on('click', function () {
        var $this = $(this);
        var $modal = $('#edit-modal');
        var actionSrc = $this.attr('href');
        var categoryName = $this.parents('tr').find('td').eq(0).find('a').html();
        var categoryDescribe = $this.parents('tr').find('td').eq(1).html();
        $modal.find('[name="name"]').val(categoryName);
        $modal.find('[name="describe"]').val(categoryDescribe);
        $modal.find('[name="id"]').val($this.attr('id'));
        $modal.modal({
            backdrop : 'static'
        }).find('form').attr('action', actionSrc);

        var id = $modal.find('[name="id"]').val();
        var url = '/manage/story/storyEditCategoryExists/';
        $('#editCategory').remote('/manage/story/storyEditCategoryExists', id)
        return false;
    });

    $('.delete-btn').click(function () {
        var href = $(this).attr('href');
        layer.confirm('删除分类会导致分类下文章全部清空。<br>是否确认删除？', {
            title : ['警告！', 'font-size:18px; color:#CC6633;'],
            move : false,
            area : '400px'
        }, function () {
            window.location.href = href;
        });
        return false;
    });

});