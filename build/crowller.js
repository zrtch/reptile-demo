"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled (value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected (value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @Date: 2022-07-14 00:32:15
 */
//首先要创建一个爬虫的类
// ts -> .d.ts 翻译文件 -> js
const fs_1 = __importDefault(require("fs")); //判断
const path_1 = __importDefault(require("path")); //node核心模块
const superagent_1 = __importDefault(require("superagent")); // 这里是js代码  得安装cnpm i --save-dev @types/superagent -D
const dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
//负责爬取内容
class Crowller {
    constructor(url, analyzer) {
        this.url = url;
        this.analyzer = analyzer;
        //只关注数据存在哪
        this.filePath = path_1.default.resolve(__dirname, '../data/course.json');
        this.initSpiderProcess();
    }
    //只关注取哪里的数据
    getRawHtml () {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield superagent_1.default.get(this.url);
            return result.text;
        });
    }
    //关注数据怎么写
    writeFile (content) {
        fs_1.default.writeFileSync(this.filePath, content);
    }
    initSpiderProcess () {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield this.getRawHtml();
            const fileContent = this.analyzer.analyze(html, this.filePath);
            this.writeFile(fileContent); //最后去存储
        });
    }
}
const secret = 'secretKey';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyzer = dellAnalyzer_1.default.getInstance();
const croller = new Crowller(url, analyzer);
