// 入口函数
$(function () {

    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/user/info',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            // 渲染数据
            $('.user_info>img').attr('src', backData.data.userPic);
            $('.user_info>span').text(backData.data.nickname);
            $('.user_center_link>img').attr('src', backData.data.userPic);
        }
    });


    /*   点击左侧导航栏效果 */
    $('.level01').click(function () {
        // console.log('djl');
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() == 1) {
            // (2)二级菜单下滑
            $('.level02').slideToggle();
            $(this).find('b').toggleClass('rotate0');
            $('.level02>li:eq(0) a')[0].click();
        

        } else {
            // 取消所有的二级菜单高亮状态
            $('.level02>li').removeClass('active');
        }

    });
    // 二级菜单点击事件
    $('.level02>li').click(function () {
        // 排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 退出登录
    $('.logout').click(function () {
        localStorage.removeItem('token');
        window.location.href = './loging.html';
    });
});