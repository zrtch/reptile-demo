// target是原型，method是方法名，paramIndex是参数所在的位置
function paramDecorator(target: any, method: string, paramIndex: number){
  console.log(target, method, paramIndex);
}

class canshuTest {
  getInfo(@paramDecorator name: string, age: number){
    console.log(name,age)
  }
}

const canshu = new canshuTest()
canshu.getInfo("dell",11)