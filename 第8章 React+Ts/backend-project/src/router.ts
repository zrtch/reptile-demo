import fs from 'fs'
import path from 'path'
import { Router, Request, Response, NextFunction } from 'express'
import Crowller from './utils/crowller'
import Analyzer from './utils/analyzer'
import { getResponseData } from './utils/utils'

interface BodyRequest extends Request {
  //修正描述文件 .d.ts 不准确
  body: {[key: string]: string | undefined}
}
//登录权限的校验判断用户是否登录
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if(isLogin){
    next()
  }else{
    //返回标准的接口提示
    res.json(getResponseData(null,'请先登录'))
  }
}

const router = Router()

// router.get('/', (req: BodyRequest, res: Response) => {
//   const isLogin = req.session ? req.session.login : false
//   if(isLogin){
//     res.send(`
//     <html>
//       <body>
//         <a href='/getData'>爬取内容</a>
//         <a href='/showData'>展示内容</a>
//         <a href='/logout'>退出</a>
//       </body>
//     </html>
//     `)
//   }else{
//     res.send(`
//     <html>
//       <body>
//         <form method="post" action="/login">
//           <input type="password" name="password" />
//           <button>登录</button>
//         </form>
//       </body>
//     </html>
//     `)
//   }
// })

router.get('/api/isLogin', (req: BodyRequest, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  res.json(getResponseData(isLogin))
})

//退出
router.get('/api/logout', (req: BodyRequest, res: Response) => {
  if(req.session){
    req.session.login = undefined
  }
  res.json(getResponseData(true))
})

//登录模块
router.post('/api/login', (req: BodyRequest, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.json(getResponseData(true))
  } else {
    if ( password === '123' && req.session ) {
        req.session.login = true
        res.json(getResponseData(true))
    } else {
        res.json(getResponseData(false,"登录失败"))
    }
  }
})

//爬取数据
router.get('/getData', checkLogin , (req: BodyRequest, res: Response) => {
    const secret = 'secretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const analyzer = Analyzer.getInstance()
    new Crowller(url, analyzer);
    res.json(getResponseData(true))
})

//展示爬取数据
router.get('/showData', checkLogin ,(req: BodyRequest, res: Response) => {
    try{
      const positon = path.resolve(__dirname,'../data/course.json')
      const result = fs.readFileSync(positon,'utf-8') //通过utf-8读取文件内容
      res.json(getResponseData(JSON.parse(result)))
    }catch(e){
      res.json(getResponseData(false,'数据不存在'))
    }
})

export default router