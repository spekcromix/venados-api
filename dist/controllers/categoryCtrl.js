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
const categoryMdl_1 = __importDefault(require("../models/categoryMdl"));
class CategoryController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const categoryN = new categoryMdl_1.default({
                    description: body.description,
                    // // img: body.img,
                    name: body.name,
                    user: req.user._id
                });
                const category = yield categoryMdl_1.default.create(categoryN);
                res.status(201).json({ ok: true, category });
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
                const category = yield categoryMdl_1.default.findOneAndUpdate({ _id: id }, changeStatus, {
                    new: true
                });
                if (!category) {
                    return res.status(404).json({
                        message: `No se encontro la categoria con id: ${id}`,
                        ok: false
                    });
                }
                return res.json({
                    message: `Evento ${category.name} borrado`,
                    ok: true,
                    category
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    message: `No se encontro la categoria con id: ${id}`,
                    ok: false
                });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categoryMdl_1.default.find({ status: true });
                res.status(200).json({ ok: true, categories });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield categoryMdl_1.default.findOne({ _id: req.params.id });
                res.status(200).json({ ok: true, category });
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
                const category = yield categoryMdl_1.default.findOneAndUpdate({ _id: id }, req.body, {
                    new: true
                });
                return res.json({ ok: true, category });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
}
const categoryController = new CategoryController();
exports.default = categoryController;
