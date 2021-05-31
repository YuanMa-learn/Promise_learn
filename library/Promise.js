/*
 * 自定义promise
 */
// ES5 使用IFFE立即调用函数定义模块
(function (params) {
    // Promise构造函数
    // executor:执行器函数（同步调用）
    function Promise (executor) {

    }

    // Promise原型对象的then（）
    // 指定成功/失败的回调函数，返回一个新的Promise对象
    Promise.prototype.then = function (onResolved, onRejected) {

    }

    // Promise原型对象的catch（）
    // 指定失败的回调函数，返回一个新的Promise对象
    Promise.prototype.catch = function (onRejected) {

    }
    // Promise函数对象的resolve（）
    // 指定成功value的Promise
    Promise.resolve = function (value) {

    }

    // Promise函数对象的reject（）
    // 指定失败reason的Promise
    Promise.reject = function (reason) {

    }
    // Promise函数对象的all（）
    // 返回一个Promise，其结果由第一个完成的promise决定，否则就失败
    Promise.all = function (promises) {

    }

    // Promise函数对象的race（）
    // 返回一个Promise，只有有一个promise成功时就成功，否则就失败
    Promise.race = function (promises) {

    }
    // 向外暴露Promise函数
    window.Promise = Promise
})(window)
