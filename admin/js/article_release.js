//入口函数
$(function () {
	/* 1.加载文章类别 */
	$.ajax({
		url: BigNew.category_list,
		type: 'get',
		dataType: 'json',
		success: function (backData) {
			console.log(backData);
			// 渲染到页面
			$('select.category').html(template('cat_list', backData));
		},
	});

	/* 2.文件预览 */
	//1.给file表单元素注册onchange事件
	$('#inputCover').change(function () {
		//1.2 获取用户选择的图片
		let file = this.files[0];
		//1.3 将文件转为src路径
		let url = URL.createObjectURL(file);
		//1.4 将url路径赋值给img标签的src
		$('article_cover').attr('src', url);
	});

	/* 3.文件上传*/
	$('.btn-release,.btn-draft').on('click', function (e) {
		//禁用表单默认提交事件
		e.preventDefault();
		//创建FormData对象：参数是表单dom对象
		let fd = new FormData($('#form')[0]);
		fd.append('content', editor.txt.html());
		fd.append('state', $(this).text().trim() == '发布' ? '已发布' : '');
		$.ajax({
			url: '',
			type: 'post',
			dataType: 'json',
			data: fd,
			contentType: false,
			processData: false,
			success: function (backData) {
				console.log(backData);
				if (backData.code == 200) {
					alert('修改成功');
					$('level02>li:eq(0)', window.parent.document)
						.addClass('active')
						.siblings()
                        .removeClass('active');
                        // 回退上一页
                        window.history.back();
				}
			},
		});
	});
});
