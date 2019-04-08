// ajax全局事件
// ajaxComplete 当每个ajax请求完成的时候 调用 不管成功或者失败
// ajaxError

$(document).ajaxStart(function () {
    NProgress.start();
})
$(document).ajaxStop(function () {
    NProgress.done();
})