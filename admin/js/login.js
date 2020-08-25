// 入口函数
$(function () {
    // 1.注册点击事件
    $('.input_sub').click(function (e) {
        // 表单带有默认跳转效果，需阻止其自动跳转
        e.preventDefault();

        // 2.获得输入框内容
        let username = $('.input_txt').val();
        let password = $('.input_pass').val();
        // 3.非空判断
        if (username.length == 0 || password == 0) {
            // (1)修改模态框文本
            $('.modal-body>p').text('用户名和密码不能为空哦！');
            // (2)弹出模态框
            $('#myModal').modal();
            return;
        } else {
            // 4.ajax请求
            $.ajax({
                url: 'http://localhost:8080/api/v1/admin/user/login',
                type: 'post',
                dataType: 'json',
                data: {
                    username: username,
                    password: password
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 200) {
                        // 使用localStorage储存用户token
                        localStorage.setItem('token', backData.token);
                        // (1)修改模态框
                        $('.modal-body>p').text('登录成功！');
                        // (2)弹出模态框
                        $('#myModal').modal();
                        // (3)给模态框注册隐藏事件 
                        $('#myModal').on('hidden.bs.modal', function (e) {
                            // 跳转到首页
                            window.location.href = './index.html';
                        });
                    } else {
                        // (1)修改模态框文本
                        $('.modal-body>p').text(backData.msg);
                        // (2)弹出模态框
                        $('#myModal').modal();
                    }

                }
            });
        }


    });

});