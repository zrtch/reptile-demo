const userInfo: any = undefined;

//catchError会返回一个装饰器
function catchError(msg: string){ // 这里就会接收到传递进来的参数
  //捕获异常的东西都通过装饰器的方式去统一解决
  return  function catchError(target: any,key:string,descriptor: PropertyDescriptor){
  const fn = descriptor.value
  descriptor.value = function(){
    try{
      fn()
    }catch(e){
      console.log(`${msg} 不存在`)
    }
  }
}

}


class Product{
  // 只需在外层加个装饰器即可捕获异常
  @catchError('userInfo.name')
  getName(){
      return userInfo.name
  }
  @catchError('userInfo.age')
  getAge(){
      return userInfo.age
  }
}

const product = new Product()
product.getName()
product.getAge()