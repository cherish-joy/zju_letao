$(function () {
    $("#form").bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',        //校验成功
            invalid: 'glyphicon glyphicon-remove',  //校验失败
            validating: 'glyphicon glyphicon-refresh'   //校验中
        },
        fields:{
            username: {
                validators: {
                    notEmpty: {
                        message:"用户名不能为空"
                    },
                    stringLength: {
                        min:2,
                        max:6,
                        message: "长度要在2-6之间"
                    },
                    callback : {
                        message:"用户名错误"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message:"密码不能为空"
                    },
                    callback: {
                        message:"密码错误"
                    }
                }
            }
        }
    })

    // 表单校验插件会再提交表单的时候进行校验
    // 成功的话 就会默认提交表单 会发生页面跳转 注册表单校验成功事件 通过ajax进行发送请求
    // 校验失败 不会提交表单 配置插件提示用户
    $("#form").on("success.form.bv",function (e) {
        e.preventDefault();
        $.ajax(
            {
                url : "/employee/employeeLogin",
                type : "post",
                data : $("#form").serialize(),
                dataType : "json",
                success : function (info) {
                    if (info.success) {
                        location.href = "index.html";
                    }
                    if (info.error === 1000) {
                        $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
                    }
                    if (info.error === 1001) {
                        $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
                    }
                }
            }

        )
    });
    $("[type='reset']").click(function () {
        $("form").data("bootstrapValidator").resetForm();//重置表单 true为全部重置 不填或者false为重置状态
    })

})