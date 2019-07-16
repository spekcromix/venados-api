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
const userMdl_1 = __importDefault(require("../models/userMdl"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                // return console.log(body)
                const userN = new userMdl_1.default({
                    address: body.address,
                    age: body.age,
                    birthDate: body.birthDate,
                    cellPhone: body.cellPhone,
                    city: body.city,
                    cPostal: body.cPostal,
                    colony: body.colony,
                    email: body.email,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    password: bcryptjs_1.default.hashSync(body.password, 10),
                    state: body.state
                });
                const user = yield userMdl_1.default.create(userN);
                res.status(201).json({ ok: true, user });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const changeStatus = {
                    status: false
                };
                const user = yield userMdl_1.default.findOneAndUpdate({ _id: id }, changeStatus, {
                    new: true
                });
                if (!user) {
                    return res.status(404).json({
                        message: `No se encontro al user con id: ${id}`,
                        ok: false
                    });
                }
                return res.json({
                    message: `Usuario ${user.firstName} borrado`,
                    ok: true,
                    user
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    message: `No se encontro al user con id: ${id}`,
                    ok: false
                });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, perPage = 10, filter, orderField, orderType, filterOpt = 'firstName', status } = req.query;
                const options = {
                    page: parseInt(page, 10),
                    limit: parseInt(perPage, 10),
                    sort: {
                        firstName: 1
                    }
                };
                let filtroE = new RegExp(filter, 'i');
                const query = {
                    $and: [
                        {
                            [filterOpt]: filtroE
                        },
                        {
                            status
                        }
                    ]
                };
                if (orderField && orderType) {
                    options.sort = {
                        [orderField]: orderType
                    };
                }
                const users = yield userMdl_1.default.paginate(query, options);
                return res.status(200).json({
                    users,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userMdl_1.default.findOne({ _id: req.params.id });
                res.status(200).json({ ok: true, user });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userMdl_1.default.findOneAndUpdate({ _id: id }, req.body, {
                    new: true
                });
                return res.json({ ok: true, user });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
