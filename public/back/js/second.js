$(function () {
    var currentPage = 1;
    var pageSize = 5;
    $.ajax({
        url:"  /category/querySecondCategoryPaging",
        type :"get",
        dataType:"json",
        data : {
            page: currentPage,
            pageSize:pageSize

        },
        success : function (info) {
            var htmlStr = template("tmp",info);
            $("tbody").html(htmlStr);
        }
    })
})