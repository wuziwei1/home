$(function() {
	
	$(".nav-con a.on").click(function() {
		location.href = "coding.html";	
	});
	
	$(".dlu").click(function() {
		location.href = "login.html";	
	});
	
	// 注册按钮点击事件
	$("#btnRegist").click(function() {
		// 错误统计
		var errCount = 0;
		$("input[type='text'],input[type='password']").each(function() {
			// 累加错误数字
			errCount += checkTxt(this);
		});

		// 如果页面中存在错误
		if (errCount > 0) {
			return;// 退出方法
		}	
		
		$("#btnRegist").addClass("btnSccuess").val("注册成功，请稍后……");		
		location.href = "loginSuccess.html";		
	});

	$("#txtName").focus();

	$("input[type='text'],input[type='password']").focus(function() {// 获取焦点事件
		// 当用户点击文本框时，无论文本框内是否写了文字，都不显示红色错误提示
		removeErrStyle(this);
	}).blur(function() {// 失去焦点事件
		// 校验文本框
		checkTxt(this);
	}).keydown(function(event) {// 键盘按下事件
		// 如果按键编号是13，表示按下的是回车
		if (event.which == 13) {
			// 模拟点击冊按钮
			$("#btnRegist").click();
		}
	}).keyup(function() {
		// 键盘按键抬起时
		if ($(this).val() == "") {
			// 显示灰色提示文字
			$(this).next().removeClass("hidden");
		} else {
			// 隐藏灰色提示文字
			$(this).next().addClass("hidden");
		}
	});
	
	// 文本框内灰色提示文字点击事件
	$(".placeholder").click(function() {
		$(this).prev().focus();
	});
	
	// 检查文本框的内容是否为空，如果为空就显示红色提示文字
	function checkTxt(txtObj) {
		// 文本框是否出现错误
		var isHasErr = false;
		// 获取文本框内的文字
		var textStr = $(txtObj).val();
		// 获取文本框后面红色的文字元素对象
		var errTipObj = $(txtObj).parent().next();
		// 获取错误提示文字
		var getErrMsg = function() {
			var n = $(txtObj).prev().text();
			// 如果文本框内的文字为空
			if ($.trim(textStr) == "") {
				isHasErr = true;
				return "请输入" +$(txtObj).attr("placeholder");
			}
			// 如果输入文字的长度小于指定的长度
			if ($.trim(textStr).length < parseInt($(txtObj).attr("minLen"))) {
				isHasErr = true;
				return "长度太短";
			}
			if (!util.string.validate(textStr, $(txtObj).attr("validate"))) {
				isHasErr = true;
				return "请勿输入非法字符";
			}
			//获取密码和确认密码文本框的值
			var p1 = $("#txtPassword").val(), p2 = $("#txtPwdConfirm").val();
			if ($(txtObj).attr("id")=="txtPwdConfirm" && p1.length>0 && !$("#txtPassword").hasClass("txtErr")&&p1!=p2){
				isHasErr = true;
				return "密码不一致";
			}
		};
		
		// 错误提示文字
		var errMsg = getErrMsg();
		
		// 如果出现错误
		if (isHasErr) {
			if ($.support.leadingWhitespace == false) {
				$(errTipObj).text(errMsg);
				showErrTip(errTipObj);
			} else {
				// 其他浏览器使用CSS3特性实现动画
				$(errTipObj).addClass("showErrTips").text(errMsg);
			}
			// 返回1表示出错
			return 1;
		} else {
			// 去掉文本框后错误提示的红色样式
			if ($.support.leadingWhitespace == false) {
				hideErrTip(errTipObj);
			} else {
				// 其他浏览器使用CSS3特性实现动画
				$(errTipObj).removeClass("showErrTips");
			}
			// 返回0表示成功
			return 0;
		}
	}

	// 清除该文本框相关的所有错误提示样式
	function removeErrStyle(txtObj) {
		// 获取文本框后面红色的文字元素对象
		var errTipObj = $(txtObj).parent().next();
		// 去掉文本框后错误提示的红色样式
		// 如果是IE8之前的版本使用jquery的animate实现动画
		if ($.support.leadingWhitespace == false) {
			hideErrTip(errTipObj);
		} else {
			// 其他浏览器使用CSS3特性实现动画
			$(errTipObj).removeClass("showErrTips");
		}
	}
	
	// 显示错误提示动画
	function showErrTip(txtObj) {
		$(txtObj).animate({
			opacity : '1',
			right : '10px'
		}, "fast");
	}

	// 隐藏错误提示
	function hideErrTip(txtObj) {
		$(txtObj).animate({
			opacity : '0',
			right : '0px'
		}, "fast");
	}
});