$(function () {
    $("#form").bootstrapValidator({
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
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message:"密码不能为空"
                    }
                }
            }
        }
    })
})