$(function () {
    var arr = [];
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem("search_list",jsonStr);

    render();

    function getHistory() {
        var history = localStorage.getItem("search_list")||'[]';
        var arr = JSON.parse(history);
        return arr;

    }

    function render() {
        var  arr = getHistory();
        var htmlStr = template("history_tmp",{arr:arr});
        $(".lt_content").html(htmlStr);
    }
    $(".lt_content").on("click",".btn_empty",function () {

        mui.confirm("你确定要清空历史记录吗?","温馨提示",["取消","确定"],function (e) {
            if (e.index === 1) {
                localStorage.removeItem("search_list");
                render();
            }

        })

    })

    $(".lt_content").on("click",".history_del",function () {
        mui.confirm("你确定要删除此条记录吗?","温馨提示",["取消","确定"],function (e) {
            var that = this;
            if (e.index === 1) {
                var index = $(that).data("id");
                var arr = getHistory();
                arr.splice(index,1);
                localStorage.setItem("search_list",JSON.stringify(arr));
                render();
            }
        })


    })

    $("#search").click(function () {
        var key = $("#search_text").val().trim();
        var arr = getHistory();

        var index = arr.indexOf(key);
        if (key == "") {
            mui.toast("请输入搜索关键字")
            return;
        }
        if ( index !=- 1 ){
            arr.splice(index,1)
        }

        arr.unshift(key);
        if (arr.length > 5) {
            arr.pop();
        }
        localStorage.setItem("search_list",JSON.stringify(arr));
        render();
        $("#search_text").val("");
        location.href = "searchList.html?key="+key+"";


    })
})