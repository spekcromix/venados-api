"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMdl_1 = __importDefault(require("../models/userMdl"));
exports.default = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const user = yield userMdl_1.default.findOne({
                    email: body.email
                });
                // return console.log(user)
                if (!user) {
                    return res.status(400).json({
                        message: '(user) y/o contraseña incorrectos',
                        ok: false
                    });
                }
                if (!bcryptjs_1.default.compareSync(body.password, user.password)) {
                    return res.status(404).json({
                        message: 'user y/o (contraseña) incorrectos',
                        ok: false
                    });
                }
                const SECRET = process.env.SECRET;
                let token = jsonwebtoken_1.default.sign({
                    user
                }, SECRET, {
                    expiresIn: process.env.EXPIRATION
                });
                res.json({
                    user,
                    menu: getMenu(user.role),
                    ok: true,
                    token
                });
            }
            catch (err) {
                return res.status(500).json({
                    err,
                    ok: false
                });
            }
        });
    }
};
function getMenu(role) {
    let menu = [
        {
            title: 'Eventos',
            url: '/events'
        },
    ];
    if (role === 'ADMIN') {
        menu.unshift({
            title: 'Dashboard',
            url: '/dashboard'
        });
    }
    return menu;
}
