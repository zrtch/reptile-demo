//(...args: any[]) => any 这是一个函数，这个函数接收很多的参数。参数的每一项都是any的类型。new的意思是构造函数
function testDecorator() {
   return function <T extends new (...args: any[]) => any>(constructor: T){
    //当你constructor是T的时候，这个东西肯定会有构造函数
      return class extends constructor{ //这里就可以进行扩展,对构造函数进行扩展
        name = "lee";
        getName(){
          return this.name
        }
      }
   }
}

//通过工厂函数的形式对原来的类做一下装饰器的修饰
const Test = testDecorator()(
  class {
    name: string;
    constructor(name: string){
      this.name = name
    }
  }
)
//然后生成一个新的类给到test，再去创建类的实例的时候就够去通过语法提示使用你新增的类的方法
const test = new Test('dell');
console.log(test.getName())