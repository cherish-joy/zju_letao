$(function () {

    $("#login").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            url:"/user/login",
            type:"post",
            data:{
                username:username,
                password:password,
            },
            success:function (info) {
                console.log(info)
                if (info.error==403){
                    mui.toast("用户名或者密码错误");
                    return;
                }
                if (info.success) {
                    if (location.search.indexOf("retURL") > -1) {
                        var retURL = location.search.replace("?retURL","");
                        location.href = retURL;
                    } else {
                        location.href = "user.html";
                    }
                }
            }
        })
    })
})