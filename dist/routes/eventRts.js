"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventCtrl_1 = __importDefault(require("../controllers/eventCtrl"));
const authentication_1 = require("../middlewares/authentication");
class EventRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/', [authentication_1.AUTH.verifyToken, authentication_1.AUTH.verifyAdmin], eventCtrl_1.default.create);
        this.router.get('/', 
        // [AUTH.verifyToken, AUTH.verifyAdmin],
        eventCtrl_1.default.get);
        this.router.get('/all', 
        // [AUTH.verifyToken, AUTH.verifyAdmin],
        eventCtrl_1.default.getAll);
        this.router.get('/:id', eventCtrl_1.default.getOne);
        this.router.put('/:id', eventCtrl_1.default.update);
        this.router.put('/:id/register', eventCtrl_1.default.register);
        this.router.delete('/:id', eventCtrl_1.default.delete);
    }
}
const eventRoutes = new EventRoutes();
exports.default = eventRoutes.router;
