# Promise_learn

##1 准备
### 1.1 函数对象与实例对象
 函数对象: 将函数作为对象使用时, 简称为函数对象
 
 实例对象: new 函数产生的对象, 简称为对象
  
    function Fn () { // Fn函数
    }
    const fn = new Fn() // Fn是构造函数，fn是返回的实例对象（简称对象）
    console.log(Fn.prototype) // 此处Fn是函数对象
    Fn.bind({}) // 此处Fn是函数对象，实例对象没有bind、apply、call方法，
    $('#test') // $是jQuery暴露的函数
    $.get('/test') // $是jQuery暴露的函数对象

### 1.2 两种类型的回调函数
回调函数:
函数A作为参数(函数引用)传递到另一个函数B中，并且这个函数B执行函数A。我们就说函数A叫做回调函数。如果没有名称(函数表达式)，就叫做匿名回调函数。
#### 1.2.1 同步回调: 
      
理解: 立即执行, 完全执行完了才结束, 不会放入回调队列中
例子: 数组遍历相关的回调函数 / Promise的excutor函数

       // 同步回调函数
          // 顺序执行
          const arr = [1,3,5]
          arr.forEach(item => {
            console.log(item)
          }) 
          // item => {} 是一个遍历的回调函数，同步回调函数
          console.log('forEach之后')
          // 结果：1 3 5 forEach之后
#### 1.2.2异步回调: 

理解: 不会立即执行, 会放入回调队列中将来执行
例子: 定时器回调 / ajax回调 / Promise的成功|失败的回调

    // 异步回调函数
    setTimeout(() => { // 异步回调函数，会放入队列中将来执行  只是启动任务就离开，等结果到来再处理
      console.log('timeout log')
    },0)
    console.log('after timeout')
    // 结果
    // after timeout
    // timeout log
    
#### 1.3 error
 目标: 进一步理解JS中的错误(Error)和错误处理
    mdn文档: https: //developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error

#####1.3.1 错误的类型

  Error: 所有错误的父类型
  ReferenceError: 引用的变量不存在
  TypeError: 数据类型不正确的错误
  RangeError: 数据值不在其所允许的范围内
  SyntaxError: 语法错误
  
    // 常见的内置错误
    // ReferenceError: 引用的变量不存在
    console.log(a) // Uncaught ReferenceError: a is not defined
  
    // 没有捕获error，下面的代码不会执行
  
    // TypeError: 数据类型不正确的错误
    let b = null
    console.log(b.xx) // Uncaught TypeError: Cannot read property 'xx' of null
    b = {}
    b.xx() // TypeError: b.xx is not a function
  
    // RangeError: 数据值不在其所允许的范围内
    function fn () {
      fn()
    }
    fn() // Uncaught RangeError: Maximum call stack size exceeded
  
    // SyntaxError: 语法错误
    const c = """" // Uncaught SyntaxError: Unexpected string
  
#####1.3.2 错误对象及处理        
错误处理：

   捕获错误: try ... catch
   
   抛出错误: throw error
        
错误对象

   message属性: 错误相关信息
    
   stack属性: 函数调用栈记录信息

            try {
               let d
               console.log(d.xxx)
             } catch (error) {
               console.log(error.message)
             }
           
           //自己设计的某些抛出异常的情况需要自己在使用时捕获异常，否则程序不能继续执行
             function something () {
               if(Date.now()%2 === 1) {
                 console.log('可以执行任务')
               } else {
                 throw new Error('不可以执行')
               }
             }
             try {
               something()
             } catch (error) {
               console.log(error)
             }
             
##2 promise的理解和使用
###2.1 Promise是什么
####2.1.1 理解

1.抽象表达：

   Promise是JS中进行异步编程的新的解决方案
       (旧方案：纯回调)
       
   2.具体表达：
   
   （1）从语法上说：Promise是一个构造函数
   
   （2）从功能上说：Promise对象是用来封装一个异步操作并可以获取其结果
   
   
###2.2 为什么要用Promise

1. 指定回调函数的方式更加灵活:

      旧的: 必须在启动异步任务前指定
      
      promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函数(甚至可以在异步任务结束后指定)

    2. 支持链式调用, 可以解决回调地狱问题
      什么是回调地狱? 回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调函数执行的条件
      
      回调地狱的缺点?  不便于阅读 / 不便于异常处理
      
      解决方案? promise链式调用
      
      终极解决方案? async/await
###2.3 如何使用Promise
1.Promise的状态改变

   pending-->resolved
      
   pending-->rejected
      
   说明：只有这两种状态变化，且改变是不可逆的，一个promise仅可改变一次
   
   无论成功失败，都会有一个结果
   
   成功的结果数据一般成为value，失败的结果数据一般称为reason
  
####2.3.1 Promise API
   
 1. Promise构造函数: Promise (excutor) {}
 
   excutor函数: 同步执行  (resolve, reject) => {}
        
   resolve函数: 内部定义成功时我们调用的函数 value => {}
   
   reject函数: 内部定义失败时我们调用的函数 reason => {}
   
   说明: excutor会在Promise内部立即同步回调,异步操作在执行器中执行

2. Promise.prototype.then方法: (onResolved, onRejected) => {}

onResolved函数: 成功的回调函数  (value) => {}

onRejected函数: 失败的回调函数 (reason) => {}

说明: 指定用于得到成功value的成功回调和用于得到失败reason的失败回调,返回一个新的promise对象

3. Promise.prototype.catch方法: (onRejected) => {}

onRejected函数: 失败的回调函数 (reason) => {}

说明: then()的语法糖, 相当于: then(undefined, onRejected)

4. Promise.resolve方法: (value) => {}

value: 成功的数据或promise对象

说明: 返回一个成功/失败的promise对象

5. Promise.reject方法: (reason) => {}

reason: 失败的原因

说明: 返回一个失败的promise对象

6. Promise.all方法: (promises) => {}

promises: 包含n个promise的数组

说明: 返回一个新的promise, 只有所有的promise都成功才成功, 只要有一个失败了就直接失败,并且reject的是第一个抛出的错误信息

7. Promise.race方法: (promises) => {}

promises: 包含n个promise的数组

说明: 返回一个新的promise, 第一个完成的promise的结果状态就是最终的结果状态

#####2.3.2 Promise的几个关键问题

