/*
 * @Descripttion: 
 * @Date: 2022-07-27 21:56:30
 */
import cheerio from 'cheerio'
import fs from 'fs'
import { Analyze } from './crowller'


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

export default class DellAnalyzer implements Analyze{
    //数据生成
    private  getCourseInfo(html: string){
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

            //作用就是生成json
    genrateJsonContent(courseInfo: CourseResult,filePath: string){
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

    public analyze(html: string,filePath: string){
       const courseInfo =  this.getCourseInfo(html)   //然后去分析
       const fileContent = this.genrateJsonContent(courseInfo,filePath) //拿到所有的courseInfo，通过它去生成json的content内容
        return JSON.stringify(fileContent)
    }
    
}