// 入口函数
$(function () {
	/* 1.获取从文章列表页传过来的id */
	let id = window.location.href.split('=')[1];
	console.log(id);

	/* 2.先加载所有的文章分类列表 */
	$.ajax({
		url: BigNew.category_list,
		type: 'get',
		dataType: 'json',
		success: function (backData) {
			console.log(backData);
			//模板引擎渲染页面
			$('.category').html(template('cat_list', backData));

			// 先等文章分类加载完，再加载文章详情
			getArticleDetail();
		},
	});

	/* 3.ajax请求文章详细信息 */
	// 封装成一个函数
	function getArticleDetail() {
		$.ajax({
			url: BigNew.article_search,
			type: 'get',
			dataType: 'json',
			data: {
				id: id,
			},
			success: function (backData) {
				console.log(backData);
				// 渲染文章详细信息
				$('.title').val(backData.data.title);
				$('.article_cover').attr('src', backData.data.cover);
				$('.category').val(backData.data.categoryId);
				$('#testico').val(backData.data.date);
				// 富文本编辑器设置需要用到自己的语法
				editor.txt.html(backData.data.content);
			},
		});
	}
	/* 4.文件预览 */
	//1.给file表单元素注册onchange事件
	$('#inputCover').change(function () {
		//1.2 获取用户选择的图片
		let file = this.files[0];
		//1.3 将文件转为src路径
		let url = URL.createObjectURL(file);
		//1.4 将url路径赋值给img标签的src
		$('.article_cover').attr('src', url);
	});

	/* 5.文件提交：已发布和草稿 
        注意点：点击修改和存为草稿都可以修改文章，只是state参数不同
        解决方案：
        1.封装一个函数
        2.同时注册+判断
    */

	$('.btn-edit,.btn-draft').on('click', function (e) {
		//(1)禁用表单默认提交事件
		e.preventDefault();
		//(2)创建FormData对象：参数是表单dom对象
		let fd = new FormData($('form')[0]);
		/* 
            注意点：
            a.formdata默认只能获取有name属性的表单值
            b.如果formdata获取参数<接口文档参数 则可以使用append手动追加
            c.append()如果追加了重复参数，fd不会覆盖，而是全部发个服务器
        */
		fd.append('id', id);
		fd.append('data', $('#testico').val());
		fd.append('content', editor.txt.html());
		fd.append('state', $(this).text() == '修改' ? '已发布' : '草稿');
		$.ajax({
			url: BigNew.article_edit,
			type: 'post',
			dataType: 'json',
			data: fd,
			contentType: false,
			processData: false,
			success: function (backData) {
				console.log(backData);
				if (backData.code == 200) {
                    alert('编辑成功');
                    // 回退上一级页面：文章列表
                    // window.location.href='./article_list.html'
                    window.history.back();
				}
			},
		});
	});
});
