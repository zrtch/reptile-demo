//解决的是场景就是某一个状态是固定的几个值，那就可以用枚举类型表示，默认从0开始
enum Status {
    OFFLINE,
    // OFFLINE = 1, //手动设置初始值，OFFLINE就从1开始计算
    ONLINE,
    DELETED
}

console.log(Status.OFFLINE); // 0
console.log(Status.ONLINE); // 1
console.log(Status.DELETED); // 2
//反向去查枚举类型的名称
console.log(Status[0]); // OFFLINE

function getResult(status) {
    if (status === Status.OFFLINE) {
        return 'offline';
    } else if (status === Status.ONLINE) {
        return 'online'
    } else if (status === Status.DELETED) {
        return 'deleted'
    }
    return 'error'
}
console.log(getResult(Status.ONLINE)); //online
console.log(getResult(0)); //OFFLINE