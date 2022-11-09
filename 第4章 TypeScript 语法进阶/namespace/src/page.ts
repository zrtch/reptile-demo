//Home这个命名空间是依赖components.ts这个文件的
///<reference path="./components.ts" />

namespace Home{
 export class Page {
  user: Components.User = {
    name: 'dell'
  }
    constructor(){
      new Components.Header()
      new Components.Content()
      new Components.Footer()
    }
  }
}


