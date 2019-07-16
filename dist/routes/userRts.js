"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCtrl_1 = __importDefault(require("../controllers/userCtrl"));
// import { AUTH } from '../middlewares/auth';
const authentication_1 = require("../middlewares/authentication");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', userCtrl_1.default.create);
        this.router.get('/', [authentication_1.AUTH.verifyToken, authentication_1.AUTH.verifyAdmin], userCtrl_1.default.get);
        this.router.get('/:id', userCtrl_1.default.getOne);
        this.router.put('/:id', userCtrl_1.default.update);
        this.router.delete('/:id', userCtrl_1.default.delete);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
