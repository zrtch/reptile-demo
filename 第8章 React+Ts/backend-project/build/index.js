"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const cookie_session_1 = __importDefault(require("cookie-session"));
var bodyParser = require('body-parser');
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['teacher dell'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router_1.default);
app.listen(7001, () => {
    console.log('server is running');
});
