//类的泛型。创建一个类
class DateManager<T>{ 
    constructor(private data: T[]){}
    getItem(index: number): T {
        return this.data[index]
    }
}

const data = new DateManager<string>(['1','111']) //data实例是字符串数组
console.log(data.getItem(1)); // 111

//泛型继承
interface Item{
    name: string
}
class DateManager1<T extends Item>{ //T继承Item
    constructor(private data: T[]){}
    getItem(index: number): string{
        return this.data[index].name
    }
}
const data2 = new DateManager1([
    { 
        name:"dell" 
    }
])

//如何使用泛型作为一个具体的类型注解
function hello<T>(param: T){
    return param
}
const func: <T>(param: T) => T = hello