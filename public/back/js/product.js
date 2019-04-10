$(function () {
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            url:"/product/queryProductDetailList",
            type : "get",
            data :{
                page : currentPage,
                pageSize : pageSize,
            },
            dataType: "json",
            success : function (info) {
                console.log(info)
                var htmlStr = template("tmp",info);
                $('tbody').html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages : Math.ceil(info.total/info.size),
                    itemTexts : function(type,page,current){
                        console.log(arguments)
                        switch (type) {
                            case ("page"):return page;
                            case ("next"):return "下一页";
                            case ("last"):return "尾页";
                            case ("first"):return "首页";
                            case ("prev") :return "上一页";
                        }
                    },
                    tooltipTitles : function(type,page,current){
                        switch (type) {
                            case ("page"):return "第"+page+"页";
                            case ("next"):return "前往下一页";
                            case ("last"):return "前往尾页";
                            case ("first"):return "前往首页";
                            case ("prev") :return "前往上一页";
                        }
                    },
                    useBootstrapTooltip : true,
                    onPageClicked:function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    $("#addpro").click(function () {
        $("#addpromodel").modal("show");
        $.ajax({
            url: " /category/querySecondCategoryPaging",
            type: "get",
            dataType: "json",
            data: {
                page: 1,
                pageSize:100,
            },
            success : function (info) {
                console.log(info);
                var htmlStr = template("droptmp",info);
                $(".dropdown-menu").html(htmlStr);

            }
        })
        $(".dropdown-menu").on("click","a",function () {
            $(".txt").text($(this).text());
            $("#hidden1").val($(this).data("id"));
            $("#form").data("bootstrapValidator").updateStatus("brandId","VALID")
        })
    })
    var picArr = [];
    $("#uploadpic").fileupload({
        dataType:"json",
        done : function (e, data) {
            picArr.unshift(data.result);
            console.log(picArr);
            $(".picbox").prepend("<img width='100px' src='"+data.result.picAddr+"'>")
            if (picArr.length > 3) {
                picArr.pop();
                $(".picbox img").eq(-1).remove();
            }
            if (picArr.length === 3) {
                $("#form").data('bootstrapValidator').updateStatus("picStatus","VALID")
            }
        }
    })

    $("#form").bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',        //校验成功
            invalid: 'glyphicon glyphicon-remove',  //校验失败
            validating: 'glyphicon glyphicon-refresh'   //校验中
        },
        fields:{
            proName:{
                validators:{
                    notEmpty:{
                        message:"请输入产品名称"
                    }
                }
            },
            oldPrice:{
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price :{
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            proDesc:{
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            size :{
                validators: {
                    notEmpty: {
                        message: "请输入商品尺寸"
                    },
                    regexp:{
                        regexp: /[0-9]{2}-[0-9]{2}/,
                        message:"尺码格式,必须是32-40"
                    }
                }
            },
            num :{
                validators:{
                    notEmpty:{
                        message:"请输入商品库存"
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:"商品库存格式，必须是非零开头的数字"
                    }
                }
            },
            brandId: {
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },
            picStatus:{
                validators:{
                    notEmpty:{
                        message:"请选择三张图片"
                    }
                }
            }

        }
    })

    $("#form").on("success.form.bv",function (e) {
        e.preventDefault();
        var dataStr = $("#form").serialize();
        dataStr+="$"+picArr[0].picName+picArr[0].picAddr;
        dataStr+="$"+picArr[1].picName+picArr[1].picAddr;
        dataStr+="$"+picArr[2].picName+picArr[2].picAddr;
        console.log(dataStr)
            $.ajax({
            url:"/product/addProduct",
            type:"post",
            dataType:"json",
            data : dataStr,
            success : function (info) {
                if (info.success){
                    $("#addpromodel").modal("hide");
                    currentPage = 1;
                    render();
                    $("#form").data('bootstrapValidator').resetForm(true);
                    $(".txt").text("请选择二级分类");
                    $(".picbox img").remove();

                }
            }
        })
    })
})