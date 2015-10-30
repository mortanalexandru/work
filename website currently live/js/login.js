;var login = (function($){
    var baseUrl = "/virtualspace_web";

	function initEvent()
	{
		var result = $(".fastclick");
        try
        {
            new FastClick(result);
        }
        catch(e)
        {

        }
	}
	function initFullScreen()
    {
        window.addEventListener('DOMContentLoaded', function() {
            var page = document.getElementById('page'),
                nav = window.navigator,
                ua = nav.userAgent,
                isFullScreen = nav.standalone;
            if (ua.indexOf('Android') !== -1) {
                // 56对应的是Android Browser导航栏的高度
                page.style.height = window.innerHeight + 56 + 'px';
            } else if (/iPhone|iPod|iPad/.test(ua)) {
                // 60对应的是Safari导航栏的高度
                page.style.height = window.innerHeight + (isFullScreen ? 0 : 60) + 'px'
            }
            setTimeout(scrollTo, 0, 0, 1);
        }, false);
    }
    function initUserInfo()
    {
        var username = CacheService.getKey("username");
        $("#usertelephone").val(username);
    }
	$(function()
	{
		initEvent();
	});
	
	var api = {};
    api.telephone = {};
    api.telephone.checkTelephone = function(telephone)
    {
        var mobile=/^1[3578]\d{9}$/i;
        if(mobile.test(telephone))
        {
            return true;
        }
        return false;
    };
	api.telephone.loginClick = function(event)
	{
        var loginUrl = baseUrl+"/login/telephone";
        var mainUrl = "../../main/html/index.html";

        var usertelephone = $("#usertelephone").val();
        if(!api.telephone.checkTelephone(usertelephone))
        {
            alert("手机格式错误");
            return;
        }
        if($("#password").val() == null || $("#password").val().trim() == "")
        {
            alert("密码不能为空");
            return;
        }
        var password = $.md5($("#password").val());

        $(".login-btn").text("正在登录中...").addClass("button-login-italic");

        $.ajax({
            type:'post',
            url:loginUrl,
            data:{
                telephone:usertelephone,
                password:password
            },
            cache:false,
            success:function(data,status,xhr)
            {
                $(".login-btn").removeClass("button-login-italic");
                if(data == null) alert("参数错误");
                if(data instanceof Object)
                {
                    CacheService.storeObject("userInfo",data);
                    window.location.href = mainUrl;
                }
                else if(data === "userNoRegister")
                {
                    alert("用户未注册");
                }
                else if(data === "loginFailed")
                {
                    alert("用户名或密码错误");
                }
            },
            error:function(data,status,xhr)
            {
                if(data == null) alert("参数错误");
                if(data.responseText === "userNoRegister")
                {
                    alert("用户未注册");
                }
                else if(data.responseText === "loginFailed")
                {
                    alert("用户名或密码错误");
                }
                $(".login-btn").text("登录");
                $(".login-btn").removeClass("button-login-italic");
            }
        });

        return false;
	}
	return api;
})(window.Zepto);