//类的装饰器：就是对类修饰的工具，有一个类对它额外进行一些修饰
//装饰器本身是一个函数，不是对实例做修饰，是对类做修饰
//类装饰器接收的参数是构造函数
//通过 @ 符号进行使用

// function testDecorator(flag: Boolean){
//   if(flag){
//     return function (constructor: any){
//       constructor.prototype.getName = () => {
//         console.log('hello')
//       }
//     }
//   }else{
//     //为false就返回空
//     return function(constructor: any){}
//   }
// }

// @testDecorator(true) 
// class Test {}

// const test = new Test();
// (test as any).getName()