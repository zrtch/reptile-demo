// function nameDecorator(target: any, key: string): any{
//   const descriptor: PropertyDescriptor = {
//     writable: false
//   }
//   //创建了一个descriptor，用这个descriptor替换name的descriptor，所以name属性的descriptor的writable就变成false了
//   return descriptor
// }

// class sxTest {
//   @nameDecorator
//   name = 'dell'
// }

// const shuxing = new sxTest()
// shuxing.name = 'dell lee'
// console.log(shuxing.name);


// 修改的并不是实例上的 name, 而是原型上的 name
function nameDecorator(target: any, key: string): any{
  target[key] = 'lee'
}
// name 放在实例上
class sxTest {
  @nameDecorator
  name = 'dell'
}

const shuxing = new sxTest()
console.log((shuxing as any).__proto__.name);