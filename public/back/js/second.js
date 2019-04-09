$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            url:"  /category/querySecondCategoryPaging",
            type :"get",
            dataType:"json",
            data : {
                page: currentPage,
                pageSize:pageSize

            },
            success : function (info) {
                console.log(info)
                var htmlStr = template("tmp",info);
                $("tbody").html(htmlStr);
                $(".paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage : info.page,
                    totalPages : Math.ceil(info.total/info.size),
                    onPageClicked : function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    $("#addlist").click(function () {
        $("#addlistmodel").modal("show");

        $.ajax({
            url: "  /category/queryTopCategoryPaging",
            type: "get",
            dataType: "json",
            data: {
                page: 1,
                pageSize:100,
            },

            success : function (info) {
                console.log(info);
                var htmlStr = template("uptmp",info);
                $(".dropdown-menu").html(htmlStr);

            }
        })
    })

    $(".dropdown-menu").on("click","a",function () {
        var txt = $(this).text();
        $(".txt").text(txt);
        $("#hidden1").val($(this).data("id"));
        $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
    })

    $("#uploadpic").fileupload({
        dataType:"json",
        done:function (e, data) {
             $("#img").attr("src",data.result.picAddr);
            $("#hidden2").val(data.result.picAddr)
            $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    })

    $("#form").bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',        //校验成功
            invalid: 'glyphicon glyphicon-remove',  //校验失败
            validating: 'glyphicon glyphicon-refresh'   //校验中
        },
        fields : {
            categoryId:{
                validators : {
                    notEmpty : {
                        message:"请选择一级分类"
                    }
                }
            },
                // | brandName  | 是    | 品牌名称       |
                // | categoryId | 是    | 所属分类id     |
                // | brandLogo
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称",
                    }
                }
            },

            brandLogo: {
                validators: {
                    notEmpty : {
                        message:"请上传照片",
                    }
                }
            }
        }
    })

    $("#addlisttrue").click(function (e) {
        e.preventDefault();
        $.ajax({
            url : " /category/addSecondCategory",
            type : "post",
            dataType : "json",
            data : $("#form").serialize(),
            success : function (info) {
                if (info.success) {
                    $("#addlistmodel").modal("hide");
                    currentPage = 1;
                    render();
                    $("#form").data("bootstrapValidator").resetForm(true);
                    $(".dropdown .txt").text("请选择一级分类")
                    $("#img").attr("src","images/none.png")
                }
            }
        })
    })


})