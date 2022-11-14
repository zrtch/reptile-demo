function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor ){
  // descriptor.writable = false // writable设置不可修改
}

class fwqTest{
  private _name: string;
  constructor(name: string){
    this._name = name
  }
  get name(){
    return this._name
  }
  //访问器的装饰器
  @visitDecorator
  set name(name: string){
    this._name =  name
  }
}
 
const fwq = new fwqTest('dell')
fwq.name = 'dell lee' //
console.log(fwq.name)