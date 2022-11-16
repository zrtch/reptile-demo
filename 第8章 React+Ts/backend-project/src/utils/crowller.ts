/*
 * @Descripttion:
 * @Date: 2022-07-14 00:32:15
 */
//首先要创建一个爬虫的类
// ts -> .d.ts 翻译文件 -> js
import fs from 'fs' //判断
import path from 'path' //node核心模块
import superagent from 'superagent' // 这里是js代码  得安装cnpm i --save-dev @types/superagent -D
import { data } from 'cheerio/lib/api/attributes'
// import LeeAnalyzer from './leeAnalyzer' //不同的爬取只需要建不同的分析类
 
export interface Analyze {
    analyze: (html: string, filePath: string) => string
}

//负责爬取内容
class Crowller {
    //只关注数据存在哪
    private filePath = path.resolve(__dirname, '../../data/course.json')
    //只关注取哪里的数据
    private async getRawHtml() {
        const result = await superagent.get(this.url)
        return result.text
    }
    //关注数据怎么写
    private writeFile(content: string) {
        fs.writeFileSync(this.filePath, content)
    }

    private async initSpiderProcess() {
        const html = await this.getRawHtml() 
        const fileContent = this.analyzer.analyze(html, this.filePath)
        this.writeFile(fileContent) //最后去存储
    }

    constructor(private url: string, private analyzer: Analyze) {
        this.initSpiderProcess()
    }
}

export default Crowller


