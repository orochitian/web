var pagination = {
    model : function (model, page, skipPage, limitNum, count, conditions) {
        //  当前分页左右两侧保留分页数量
        /*
        *   model: 数据库模型
        *   page: 当前分页
        *   skipPage: 当前分页左右两侧保留分页数量
        *   limitNum: 每页显示多少条数据
        *   count: 查询数据总数
        *   conditions: 分页查询条件
        * */
        this.page = parseInt(page) || 1;
        //  前台分页数组
        this.pageArray = [];
        //  总分页数
        count < 1 ? count = 1 : '';
        var pageNum = Math.ceil(count/limitNum);
        this.pageNum = Math.ceil(count/limitNum);
        //  排除手动修改分页
        this.page < 1 ? this.page = 1 : '';
        this.page > pageNum ? this.page = pageNum : '';

        //  总共显示多少分页    分页两侧保留数量 + 当前分页 = 总共显示页数
        var totalPage = skipPage * 2 + 1;
        //  第一个分页号
        var startPage = 1;
        /*
        *   当当前分页大于左侧保留的页数 + 第一个显示的页号。那么，第一个页号=当前页-左侧保留页数。
        *   例如：两侧保留3(skipPage)个分页。 那么当分页号大于4(skipPage + startPage)的时候
        *   第一个分页号应该改为(page - skipPage)。
        *   总共显示的分页数应该改为 （page + skipPage）
        * */
        if( this.page > skipPage + startPage && pageNum > totalPage  ) {
            startPage = this.page - skipPage;
            totalPage = this.page + skipPage;
        }
        /*
        *   只有当总页数大于所要设置所要显示的总页数时，就把要设置所要显示的总页数赋值给总页数。
        *   上面已经修改了总共的页数，如果数据根本不够的话，我们就不给pageNum赋值。
        *   例如：设置为 左右保留3个分页数，加上当前页应该显示7个分页。但是如果数据库总共只查出来5个分页。
        *   那么，就不会把之前算出来的7赋值给总共的分页数，依然使用5.
        * */
        if ( pageNum > totalPage ) {
            pageNum = totalPage;
        }
        //  给发送前段的分页数组赋值，从第几页开始显示，总共显示多少页。
        for( var i=startPage; i<=pageNum; i++ ) {
            this.pageArray.push(i);
        }
        //  跳过查询的数量，等于搜索数量 * 当前页-1. 当前页为2时 limitNum * (2-1)。以此类推。
        var skipNum = limitNum * (this.page - 1);

        this.pageInfo = {};
        this.pageInfo.pageArray = this.pageArray;
        this.pageInfo.pageNum = this.pageNum;
        this.pageInfo.page = this.page;

        var conditions = conditions || {};

        return model.find(conditions).limit(limitNum).skip(skipNum);
    }
}
module.exports = pagination;