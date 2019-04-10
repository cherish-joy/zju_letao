$(function () {
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        dataType:"json",
        success : function (info) {
            console.log(info)
            var htmlStr = template("left_tmp",info);
            $(".category_left ul").html(htmlStr);
            renderSecondById(info.rows[0].id)
        }
    })

    function renderSecondById(id) {
        $.ajax({
            url: "/category/querySecondCategory",
            type: "get",
            data:{
                id:id
            },
            success:function (info) {
                console.log(info)
                var htmlStr = template("right_tmp",info);
                $(".category_right ul").html(htmlStr);
            }
        })
    }

    $(".category_left").on("click","a",function () {
        $(this).addClass("current").parent().siblings().find("a").removeClass("current");
        renderSecondById($(this).data("id"));
    })
})