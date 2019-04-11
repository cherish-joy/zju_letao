$(function () {
    var productId = location.search;

    productId = getSearch("productId");
    console.log(productId);
    $.ajax({
        url:"/product/queryProductDetail",
        type:"get",
        dataType:"json",
        data:{
            id:productId,
        },
        success : function (info) {
            console.log(info)
            var htmlStr = template("productinfo",info);
            $(".mui-scroll").html(htmlStr);
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            mui(".mui-numbox").numbox();
        }
    })

    $(".lt_main").on("click",".size",function () {
        $(this).addClass("current").siblings().removeClass("current");
    })

    $(".addcart").click(function () {
        var size = $(".size.current").text();
        console.log(size)
        if (!size) {
            mui.toast("请选择尺码");
            return;
        }
        var num = $(".mui-numbox-input").val();
        $.ajax({
            url: " /cart/addCart",
            type: "post",
            data: {
                productId:productId,
                num:num,
                size:size
            },
            success : function (info) {
                console.log(info)
                if (info.error == 400) {
                    location.href = "login.html?retURL="+location.href;
                }
                if (info.success) {
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function (e) {
                        if (e.index == 0) {
                            location.href = "cart.html";
                        }
                    });
                }
            }
        })
    })
})