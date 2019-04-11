$(function () {
    function render(){
        setTimeout(function () {
            $.ajax({
                url:"/cart/queryCart",
                type:"get",
                success:function (info) {
                    console.log(info)
                    console.log(info[0].pic[0].picAddr)
                    if (info.error == 400) {
                        location.href = "login.html"
                    }
                    var htmlStr = template("cartinfo",{arr:info})
                    $(".mui-table-view").html(htmlStr)
                    mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh()
                }
            })
        },500)
    }

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback :function () {
                    render();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $(".lt_main").on("tap","#delete",function () {
        $.ajax({
            url: " /cart/deleteCart",
            type: "get",
            data: {
                id:[$(this).data("id")]
            },
            success : function (info) {
                if (info.success) {
                    mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading()
                }
            }
        })
    })
})