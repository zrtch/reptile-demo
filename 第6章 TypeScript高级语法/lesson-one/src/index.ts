// 普通方法，target 对应的是类的 prototype
// 静态方法，target 对应的是类的构造函数
// target: 原型；key：key值；descriptor：控制函数的东西
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor ){
  // console.log(target, key)
  // descriptor可以对方法的一些属性做一些编辑
  // descriptor.writable = true
  descriptor.value = function() { //这里就能拿到getName的引用，就可以对你原来的方法做一些变更
    return 'descriptor'
  }
}

//只要你定义的类的时候，他就会对类的方法进行装饰
class newTest {
  name: string;
  constructor(name: string){
    this.name = name
  }
  @getNameDecorator
  getName(){
    return this.name
  }
}

const newValue = new newTest('dell')
// newValue.getName = () => {
//   return '123'
// }
console.log(newValue.getName())
