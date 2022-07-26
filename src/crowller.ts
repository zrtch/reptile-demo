/*
 * @Descripttion: 
 * @Date: 2022-07-14 00:32:15
 */
//首先要创建一个爬虫的类
// ts -> .d.ts 翻译文件 -> js
import fs from 'fs' //判断
import path from 'path' //node核心模块
import superagent from 'superagent' // 这里是js代码  得安装cnpm i --save-dev @types/superagent -D 
import cheerio from 'cheerio'
import { data } from 'cheerio/lib/api/attributes';

interface Course{
    title: string;
    count: number
}

interface CourseResult{
    time: number,
    data: Course[]
}

interface Content{
    [propName: number]: Course[]
}

class Crowller {
    private secret = 'secretKey';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;

    //数据生成
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
       return {
            time: new Date().getTime(),
            data: courseInfos
        }
    }



   async getRawHtml(){
        const result = await superagent.get(this.url)
        return result.text
    }

    //作用就是生成json
    genrateJsonContent(courseInfo: CourseResult){
        //首先去读course.json，看它存不存在
        const filePath = path.resolve(__dirname,'../data/course.json'); 
        //不存在默认是个空对象
        let fileContent:Content = {};
        //存在的话就把course.json读取出来存给 fileContent
        if(fs.existsSync(filePath)){
            fileContent = JSON.parse(fs.readFileSync(filePath,'utf-8'))
        }
        //然后把这次爬取的courseInfo也存到content里面去
        fileContent[courseInfo.time] = courseInfo.data

        return fileContent
    }

    async initSpiderProcess(){
       const filePath = path.resolve(__dirname,'../data/course.json'); 
       const html = await this.getRawHtml()
       const courseInfo =  this.getCourseInfo(html)  
       const fileContent = this.genrateJsonContent(courseInfo) //首先拿到所有的courseInfo，通过它去生成json的content内容
       fs.writeFileSync(filePath,JSON.stringify(fileContent))

    }

    constructor(){
        this.initSpiderProcess();
    }
}

const crowller = new Crowller();
 