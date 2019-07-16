"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryCtrl_1 = __importDefault(require("../controllers/categoryCtrl"));
const authentication_1 = require("../middlewares/authentication");
class CategoryRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', [authentication_1.AUTH.verifyToken, authentication_1.AUTH.verifyAdmin], categoryCtrl_1.default.create);
        this.router.get('/', 
        // [AUTH.verifyToken, AUTH.verifyAdmin],
        categoryCtrl_1.default.get);
        this.router.get('/:id', categoryCtrl_1.default.getOne);
        this.router.put('/:id', categoryCtrl_1.default.update);
        this.router.delete('/:id', categoryCtrl_1.default.delete);
    }
}
const categoryRoutes = new CategoryRoutes();
exports.default = categoryRoutes.router;
