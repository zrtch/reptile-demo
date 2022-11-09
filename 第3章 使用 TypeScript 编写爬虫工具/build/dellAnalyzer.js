"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @Date: 2022-07-27 21:56:30
 */
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class DellAnalyzer {
  constructor() {
  }
  static getInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer();
    }
    return DellAnalyzer.instance;
  }
  //数据生成
  getCourseInfo(html) {
    const $ = cheerio_1.default.load(html);
    const courseItems = $('.course-item');
    const courseInfos = [];
    courseItems.map((index, element) => {
      const descs = $(element).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1]);
      courseInfos.push({
        title,
        count,
      });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }
  //作用就是生成json
  genrateJsonContent(courseInfo, filePath) {
    //不存在默认是个空对象
    let fileContent = {};
    //存在的话就把course.json读取出来存给 fileContent
    if (fs_1.default.existsSync(filePath)) {
      fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
    }
    //然后把这次爬取的courseInfo也存到content里面去
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }
  analyze(html, filePath) {
    const courseInfo = this.getCourseInfo(html); //然后去分析
    const fileContent = this.genrateJsonContent(courseInfo, filePath); //拿到所有的courseInfo，通过它去生成json的content内容
    return JSON.stringify(fileContent);
  }
}
exports.default = DellAnalyzer;
