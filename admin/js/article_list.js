// require('jQuery')
//入口函数
$(function () {
    //1. 加载分类列表
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            // 模板引擎渲染数据
            $('#selCategory').html(template('cat_list', backData));
        },
    });
    // 2.筛选按钮点击事件
    // 筛选项按钮在form表单中需阻止默认事件
    $('#btnSearch').click(function (e) {
        //(1) 阻止表单默认跳转
        e.preventDefault();
        // (2)发送ajax请求
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                type: $('#selCategory').val(),
                state:$('#selStatus').val(),
                page: 1,
                perpage: 10
            },
            success: function (backData) {
                console.log('筛选：'+backData);
                // 模板引擎渲染页面
                $('table>tbody').html(template('art_list', backData))

            }
        });
    });
    // 页面一加载：ajax请求所有的文章列表
    // 主动触发筛选按钮点击事件，注意要先注册筛选按钮点击事件，然后才可以调用
    $('#btnSearch').trigger('click');
    /* 4.删除文章 */
    // 删除按钮是动态加载的，所以需要注册委托事件
    $('body').on('click', '.btn-delete', function () {
        // 获取id
        let id = $('.btn-delete').attr('data-id');
        console.log(id);
        // ajax请求数据
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: id

            },
            success:function(backData){
                console.log('删除：'+backData);
                if(backData.code==204){
                    alert(backData.msg);
                    // 刷新页面
                    window.location.reload();
                }else{
                    alert(backData.msg);

                }

            }
        });
    });
});