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
const runnerMdl_1 = __importDefault(require("../models/runnerMdl"));
class RunnerController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const runnerN = new runnerMdl_1.default({
                    event: body.event,
                    distance: body.distance,
                    runner: req.user._id,
                    shirtSize: body.shirtSize
                });
                const runner = yield runnerMdl_1.default.create(runnerN);
                res.status(201).json({ ok: true, runner });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
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
                const runners = yield runnerMdl_1.default.paginate(query, options);
                return res.status(200).json({
                    runners,
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
                const runner = yield runnerMdl_1.default.findOne({ _id: req.params.id });
                res.status(200).json({ ok: true, runner });
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
                const runner = yield runnerMdl_1.default.findOneAndUpdate({ _id: id }, req.body, {
                    new: true
                });
                return res.json({ ok: true, runner });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
}
const runnerController = new RunnerController();
exports.default = runnerController;
