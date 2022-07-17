/*
 * @Descripttion: 
 * @Date: 2022-07-14 00:32:15
 */
//首先要创建一个爬虫的类
// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent' // 这里是js代码  得安装cnpm i --save-dev @types/superagent -D 
import cheerio from 'cheerio'
import { data } from 'cheerio/lib/api/attributes';

interface Course{
    title: string;
    count: number
}

class Crowller {
    private secret = 'secretKey';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

    //数据生成模块
    getCourseInfo(html: string){
        const $ = cheerio.load(html)
        const courseItems = $('.course-item')
        const courseInfos: Course[] = []
        courseItems.map((index,element)=>{
            const descs = $(element).find('.course-desc');
            const title = descs.eq(0).text()
            const count = parseInt(descs.eq(1).text().split('：')[1])
            courseInfos.push({
                title,count
            })
        })
        const result = {
            time: new Date().getTime(),
            data: courseInfos
        }
        console.log('🤩 ~ Crowller ~ getCourseInfo ~ result', result);
    }

   async getRawHtml(){
        const result = await superagent.get(this.url)
        this.getCourseInfo( result.text)
    }

    constructor(){
        this.getRawHtml();
    }
}

const crowller = new Crowller();
 