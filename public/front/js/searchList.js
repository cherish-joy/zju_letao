$(function () {
    var currentPage = 1;
    var pageSize = 2;
    var key = getSearch("key");
    $("#search_text").val(key);
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容

                callback :function () {
                    currentPage = 1;
                    render(function (info) {
                        var htmlStr = template("product_tmp",info);
                        $(".lt_product").html(htmlStr);
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();

                    });
                }
        },
        up: {
            callback:function () {
                currentPage++;
                render(function (info) {
                    var htmlStr = template("product_tmp",info);
                    $(".lt_product").append(htmlStr);
                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(info.data.length===0);
                })
            }
        }

    }});

    function render(callback){
        var params = {};
        params.proName = $("#search_text").val();
        params.page = currentPage;
        params.pageSize = pageSize;

        var current = $(".lt_sort a.current");

        if (current.length > 0){
            var sortName = current.data("type");
            var sortValue = current.find("i").hasClass("fa-angle-down")?2:1;
            params[sortName] = sortValue;
        }
        console.log(params)
        setTimeout(function () {
            $.ajax({
                type:"get",
                url:"/product/queryProduct",
                data:params,
                success :function (info) {
                    callback&&callback(info);
                }
            })
        },500)
    }
    $("#search").click(function () {
        var key = $("#search_text").val();
        if (key.trim() == "") {
            mui.toast("请输入搜索关键字")
            return;
        }
        render();
        var str = localStorage.getItem("search_list")||[];
        var arr = JSON.parse(str);
        var index = arr.indexOf(key);
        if (key!=-1) {
            arr.splice(index,1)
        }
        arr.unshift(key);
        if (arr.length > 5) {
            arr.pop();
        }
        localStorage.setItem("search_list",JSON.stringify(arr))
    })

    $(".lt_sort a[data-type]").click(function () {
        if ($(this).hasClass("current")){
            $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
        }else {
            $(this).addClass("current").siblings().removeClass("current");

        }
        render()
    })

    $(".lt_product").on("tap","a",function () {
        var id = $(this).data("id");
        location.href = "product.html?productId="+id;
    })


})