// 泛型 generic 泛指的类型；泛型是你用这个方法的时候才才知道T是哪个类型
function join<T>(first: T, second: T){
    return `${first}${second}`
}
// 调用join这个方法的时候，指定T这个泛型具体类型的是string
join<string>('1','1')
join<number>(1,1)
join<string>('1', 1) //number就不匹配了

//  T[] 或者 Array<T>
function map<T>(params:Array<T>){
    return params
}
map<string>(['123'])

//多个泛型
function join1<T,P>(first: T,second : P){
    return `${first} ${second}`
}
join1<number,string>(1,'1')