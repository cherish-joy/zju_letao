$(function (){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data: {
                page:currentPage,
                pageSize:pageSize
            },
            dataType: "json",
            success : function (info) {
                console.log(info);
                var htmlStr = template('tmp',info);
                $('tbody').html(htmlStr);
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    totalPages:Math.ceil(info.total/info.size),
                    currentPage:info.page,
                    onPageClicked : function (a, b, c, page) {
                        currentPage=page;
                        render();
                    }
                })
            }
        })
    }
    var currentId;
    var isDelete;
    $("tbody").on("click",".btn",function () {
        currentId = $(this).parent().data("id");
        isDelete = $(this).hasClass("btn-danger")?0:1;
        $("#userMordel").modal("show");
    })

    $("#user-btn").click(function () {
        $.ajax({
            url:"/user/updateUser",
            type: "post",
            dataType: "json",
            data: {
                id:currentId,
                isDelete:isDelete,
            },
            success : function (info) {
                console.log(info)
                if (info.success) {
                    $("#userMordel").modal("hide"),
                        render();
                }
            }
        })
    })


})