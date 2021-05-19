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

#####1. 错误的类型

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
  
        
   2. 错误处理
        捕获错误: try ... catch
        抛出错误: throw error
        
   3. 错误对象
        message属性: 错误相关信息
        stack属性: 函数调用栈记录信息
