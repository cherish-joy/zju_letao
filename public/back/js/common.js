// ajax全局事件
// ajaxComplete 当每个ajax请求完成的时候 调用 不管成功或者失败
// ajaxError
// 登录拦截
$(document).ajaxStart(function () {
    NProgress.start();
});
$(document).ajaxStop(function () {
    NProgress.done();
});
$(function () {
    if (location.href.indexOf("login")== -1) {
        $.ajax({
            url: " /employee/checkRootLogin",
            type: "get",
            dataType: "json",
            success:function (info) {
                if (info.success){
                    console.log("登录成功");
                }
                if (info.error === 400) {
                    location.href = "login.html"
                }
            }
        });
    }
})


$(function() {
    $(".list-type").click(function () {
        $(".child").slideToggle();
    })
    $(".icon-left").click(function () {
        $(".left").toggleClass("hiddenmenu");
        $(".main").toggleClass("hiddenmenu");
        $(".main-top").toggleClass("hiddenmenu")
    })
    $(".icon-right").click(function () {
        $("#logoutmodel").modal("show");
    })
    $("#logout-btn").click(function () {
        $.ajax({
            url:"  /employee/employeeLogout",
            type:"get",
            dataType:"json",
            success:function (info) {
                if (info.success) {
                    location.href = "login.html"
                }
            }
        })
    })
})

