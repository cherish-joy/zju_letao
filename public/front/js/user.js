$(function () {
    $.ajax({
        url:"/user/queryUserMessage",
        type:"get",
        success : function (info) {
            console.log(info)

            var htmlStr = template("userinfo",info);
            $("#usersinfo").html(htmlStr)
        }
    })

    $("#logout").click(function () {
        $.ajax({
            url: "/user/logout",
            type: "get",
            success:function (info) {
                console.log(info)
                if (info.success){
                    location.href = "login.html"
                }
            }
        })
    })
})