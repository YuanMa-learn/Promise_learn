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

1.	如何改变promise的状态?

      (1)resolve(value): 如果当前是pendding就会变为resolved
      
      (2)reject(reason): 如果当前是pendding就会变为rejected
      
      (3)抛出异常: 如果当前是pendding就会变为rejected

2.	一个promise指定多个成功/失败回调函数, 都会调用吗?

      当promise改变为对应状态时都会调用
        
            const p =new Promise(((resolve, reject) => {
                  // resolve(1) // promise 变成成功状态
                  // reject(2) // promise 变成失败状态
                  // throw new Error('出错了') // 抛出异常，promise变为rejected失败状态，reason为抛出的error
                  throw 3 // 抛出异常，promise变为rejected失败状态，reason为抛出的3
                }))

 3.改变promise状态和指定回调函数谁先谁后?
 
(1)都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调(then是同步调用的，只是指定回调函数并没有开始调用，而执行器函数中的操作是异步的，异步操作返回结果后再调用回调函数)
 
 (2)如何先改状态再指定回调?
 
   ①在执行器中直接调用resolve()/reject()

   ②延迟更长时间才调用then()

(3)什么时候才能得到数据?
 
 ①如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据

②如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据

  // 先指定回调再改状态
    new Promise(((resolve, reject) => {
      setTimeout(() => {
        resolve(1) // 后改变的状态（同时指定数据），异步执行回调函数
      }, 1000)
    })).then( // 先指定回调函数，保存当前指定的回调函数
            value => {},
            reason => {}
    )

    //先改状态再指定回调
    new Promise(((resolve, reject) => {
      resolve(1) // 先改变的状态（同时指定数据）
    })).then( // 后指定回调函数，异步执行回调函数，尽管状态已经改变执行条件已经满足，仍会将回调函数加如到队列中等待主进程完成后再执行即异步执行
            value => {},
            reason => {}
    )

    const p1 = new Promise(((resolve, reject) => {
      setTimeout(() => {
        resolve(1) // 先改变的状态（同时指定数据），异步执行回调函数
      }, 1000)
    }))
    setTimeout(() => {
      p1.then(
              value => {},
              reason => {}
      )
    },1010)
    
 4.	promise.then()返回的新promise的结果状态由什么决定?
 
(1)简单表达: 由then()指定的回调函数执行的结果决定

(2)详细表达:

①如果抛出异常, 新promise变为rejected, reason为抛出的异常

②如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值

③如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果

          new Promise(((resolve, reject) => {
              resolve(1) // promise 变成成功状态
              // reject(2) // promise 变成失败状态
              // throw new Error('出错了') // 抛出异常，promise变为rejected失败状态，reason为抛出的error
              // throw 3 // 抛出异常，promise变为rejected失败状态，reason为抛出的3
            })).then(
                    value => {
                      console.log('onResolved1()', value) // 无返回值默认undefined
                      // return 2 // 如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值
                      // return Promise.resolve(3) // 如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果
                      // return Promise.reject(4)
                      throw 5 // 抛出异常，新promise变为rejected, reason为抛出的异常
                    },
                    reason => {
                      console.log('onRejected1()', reason)
                    }
            ).then(
                    value => {
                      console.log('onResolved2()', value)
                    },
                    reason => {
                      console.log('onRejected2()', reason)
                    }
            )
            
5.promise如何串连多个操作任务?

(1)promise的then()返回一个新的promise, 可以开成then()的链式调用

(2)通过then的链式调用串连多个同步/异步任务

         new Promise(((resolve, reject) => {
              setTimeout(() => {
                console.log('执行任务1（异步）')
                resolve(1)
              },1000)
            })).then(
                    value => {
                      console.log('任务1的结果:', value)
                      return new Promise((resolve, reject) => { // then中执行异步任务，不能简单返回值，应该返回一个promise对象用于表示此异步任务的状态
                        setTimeout(() => {
                          console.log('执行任务2（异步）')
                          resolve(2)
                        },1000)
                      })
                    }
            ).then(
                    value => {
                      console.log('任务2的结果：', value)
                      console.log('执行任务3(同步)')
                      return 3
                    }
            ).then(
                    value => {
                      console.log('执行任务3的结果：', value)
                    }
            )
6.promise异常传透?

(1)当使用promise的then链式调用时, 可以在最后指定失败的回调,

(2)前面任何操作出了异常, 都会传到最后失败的回调中处理

        new Promise(((resolve, reject) => {
              reject(1) // 失败状态直接向下传透至最后的异常处理
            })).then(
                    value => {
                      console.log('onResolved1()', value)
                      return 2
                    }
                    // 此处在没有指定失败的回调函数时相当于
                    //         reason => {
                    //           throw reason
                    // }
                    // 或
                    // reason => Promise.reject(reason) // 此处注意胖箭头=>作用在右侧没有{}时，有return的功能
                    // 于是失败状态从第一级层层传递至最后的catch
            ).then(
                    value => {
                      console.log('onResolved2()', value)
                      return 3
                    }
            ).then(
                    value => {
                      console.log('onResolved3()', value)
                    }
            ).catch(
                    reason => {
                      console.log('onRejected1()', reason)
                    }
            )
            //打印结果
            // onRejected1() 1

7.中断promise链?

(1)当使用promise的then链式调用时, 在中间中断, 不再调用后面的回调函数

(2)办法: 在回调函数中返回一个pendding状态的promise对象

        new Promise(((resolve, reject) => {
               reject(1) // 失败状态直接向下传透至最后的异常处理
            })).then(
                    value => {
                      console.log('onResolved1()', value)
                      return 2
                    }
                    // 此处在没有指定失败的回调函数时相当于
                    //         reason => {
                    //           throw reason
                    // }
                    // 或
                    // reason => Promise.reject(reason) // 此处注意胖箭头=>作用在右侧没有{}时，有return的功能
                    // 于是失败状态从第一级层层传递至最后的catch
            ).then(
                    value => {
                      console.log('onResolved2()', value)
                      return 3
                    }
            ).then(
                    value => {
                      console.log('onResolved3()', value)
                    }
            ).catch(
                    reason => {
                      console.log('onRejected1()', reason)
                      return new Promise(() => {}) // 返回一个pending状态的promise对象，所以then中的回调函数都不会被调用，中断promise链
                      // 注释此行打印结果
                      // onRejected1() 1
                     // onResolved4() undefined
                      // 不注释打印结果
                     //  onRejected1() 1
                    }
            ).then(
                    value => {
                      console.log('onResolved4()', value)
                    },
                    reason => {
                      console.log('onRejected2()', reason)
                    }
            )
            
