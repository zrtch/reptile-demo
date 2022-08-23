// 联合类型及类型保护
interface Bird{
    fly: boolean;
    sing:()=>{}
}

interface Dog{
    fly:boolean;
    bark:()=>{}
}

// animal: Bird | Dog 表示联合类型，用或的运算符进行
// 通过类型断言的方式去做类型保护
function trainAnial(animal: Bird | Dog){
    if(animal.fly){
        (animal as Bird).sing() //这样就会报错 应为Dog类型没有sing方法
    }else{
        (animal as Dog).bark()
    }
}

// in 语法来做类型保护
function trainAnial2(animal: Bird | Dog){
    if('sing' in animal){ //如果animal里面有sing就调用sing这个方法
        animal.sing()
    }else{
        animal.bark()
    }
}
//typeof 语法来做类型保护
function add(first:string | number,second:string | number){
    if(typeof first === 'string' || typeof second ==='string'){
        return `${first}${second}`
    }
    return first + second
}

//使用instanceof语法来做类型保护，只能使用class类定义，它可以被这个操作符
class NumberObj{
    conut: number
}
function add2( first:object | NumberObj,second:object | NumberObj){
    if(first instanceof NumberObj && second instanceof NumberObj){
        return first.conut + second.conut
    }
    return 0;
}