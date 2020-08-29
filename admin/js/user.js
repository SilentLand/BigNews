// 入口函数
$(function () {
    // 页面一加载ajax加载用户信息
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            //渲染数据
            $('.user_pic').attr('src', backData.data.userPic);
            // 遍历对象快速赋值
            for (let key in backData.data) {
                $('.' + key).val(backData.data[key]);
            }

        }
    });

    // 文件预览
    // 1.给表单注册一个onchange事件
    $('#exampleInputFile').change(function () {
        //2.获取选中的文件
        let file = this.files[0];
        // 3.根据文件生成url    
        let url = URL.createObjectURL(file);
        // 4.img标签src属性显示url
        $('.user_pic').attr('src', url);

    });

    // 文件上传
    $('.btn-edit').click(function (e) {
        // 1.阻止表单默认跳转
        e.preventDefault();
        // 2.使用formfdata生成参数
        let fd = new FormData($('form')[0]);

        // 3.ajax 请求数据
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: fd,
            processData: false,
            contentType:false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    // 1.修改模态框文本
                    $('.modal-body>p').text('修改成功')
                    // 2.弹出模态框
                    $('#myModal').modal();
                    // 3.给模态框注册隐藏事件
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        // 刷新首页
                        window.parent.location.reload();
                    });
                } else {
                    //1.修改模态框文本
                    $('.modal-body>p').text(backData.msg);
                    //2.弹出模态框
                    $('#myModal').modal();
                }
            }
        });

    });
});