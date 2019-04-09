$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data : {
                page:currentPage,
                pageSize:pageSize,
            },
            success :function (info) {
                console.log(info)
                var htmlStr = template("tmp",info);
                $("tbody").html(htmlStr);

                $(".paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function (a, b, c, page) {
                        currentPage=page;
                        render();
                    }
                })
            }
        })
    }

    $("#addlist").click(function () {
        $("#addlistmodel").modal("show");

    })

    $("#form").bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',        //校验成功
                invalid: 'glyphicon glyphicon-remove',  //校验失败
                validating: 'glyphicon glyphicon-refresh'   //校验中
            },
            fields:{
                categoryName : {
                    validators : {
                        notEmpty : {
                            message:"请输入一级分类名称"
                        }
                    }

                }
            }
        })
    $("#form").on("success.form.bv",function (e) {
        e.preventDefault();
        $.ajax({
            url:"  /category/addTopCategory",
            type: "post",
            dataType:"json",
            data: $("#form").serialize(),
            success : function (info) {

                $("#addlistmodel").modal("hide");
                $("#form").data("bootstrapValidator").resetForm(true);
                currentPage = 1;
                render();
            }
        })
    })


})