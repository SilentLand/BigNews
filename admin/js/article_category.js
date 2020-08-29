// 入口函数
$(function () {
    // ajax加载数据(查询)
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            $('.table tbody').html(template('cat_list', backData));
        },
    });

    //新增、编辑、删除功能
    // 给模态框注册事件事件：获取e.relatedTarget弹出事件源
    // 1.给模态框注册弹出事件
    $('#myModal').on('show.bs.modal', function (e) {
        // 模态框事件触发源：点击的谁弹出的模态框原生'DOM对象'
        console.log(e.relatedTarget);
        if ($(e.relatedTarget).text() == '新增分类') {
            // 新增业务逻辑
            // (1)修改模框确认按钮为新增
            $('.btn-confirm').text('新增');
        } else {
            //编辑业务逻辑
            // (2)修改模态框确定按钮为编辑
            $('.btn-confirm').text('编辑');
            // 传值：显示当前编辑的文章分类信息
            // e.relatedTarget:当前点击的编辑按钮
            $('#recipient-name').val(
                $(e.relatedTarget).parent().prev().prev().text()
            );

            $('#message-text').val($(e.relatedTarget).parent().prev().text());
            // (3)传值：将当前点击的编辑按钮的data-id传递给模态框的编辑按钮
            $('.btn-confirm').attr('data-id', $(e.relatedTarget).attr('data-id'));
        }
    });
    // 2.模态框取消按钮
    $('.btn-cancel').click(function () {
        //清空列表
        $('.modal-body>form')[0].reset();
    });
    // 3.新增分类
    $('.btn-confirm').click(function () {
        if ($(this).text() == '新增') {
            // 新增分类
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 201) {
                        alert('新增成功');
                        // 刷新页面
                        window.location.reload();
                    }
                },
            });
        } else {
            // 编辑
            // 4.编辑分类
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    id: this.attr('data-id'),
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                },
                success: function (backData) {
                    // console.log(backData);
                    if (backData.code == 200) {
                        alert('修改成功');
                        // 刷新当前页
                        window.location.reload();
                    }
                },
            });
        }
    });
    // 4.删除分类
    // 注意点：删除按钮是ajax动态添加的，需要注册委托事件
    $('body').on('click', '.btn-delete', function () {
        // (1)获取当前点击的按钮的data-id
        let id = $(this).attr('data-id');
        // console.log(id);
        // (2)ajax发送请求
        $.ajax({
            url: BigNew.category_delete,
            type: 'psot',
            dataType: 'json',
            data: {
                id: id,
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 204) {
                    alert('删除成功');
                    // 刷新成功
                    window.location.reload();
                }
            },
        });
    });
});