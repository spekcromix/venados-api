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
const eventMdl_1 = __importDefault(require("../models/eventMdl"));
class EventController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                // return console.log(body)
                const eventN = new eventMdl_1.default({
                    category: body.category,
                    date: body.date,
                    description: body.description,
                    distances: body.distances,
                    hour: body.hour,
                    // // img: body.img,
                    name: body.name,
                    place: body.place,
                    price: body.price,
                    user: req.user._id
                });
                const event = yield eventMdl_1.default.create(eventN);
                res.status(201).json({ ok: true, event });
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
                const event = yield eventMdl_1.default.findOneAndUpdate({ _id: id }, changeStatus, {
                    new: true
                });
                if (!event) {
                    return res.status(404).json({
                        message: `No se encontro al evento con id: ${id}`,
                        ok: false
                    });
                }
                return res.json({
                    message: `Evento ${event.name} borrado`,
                    ok: true,
                    event
                });
            }
            catch (err) {
                res.status(500).json({
                    err,
                    message: `No se encontro al evento con id: ${id}`,
                    ok: false
                });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, perPage = 10, filter, orderField, orderType, filterOpt = 'name', status } = req.query;
                const options = {
                    page: parseInt(page, 10),
                    limit: parseInt(perPage, 10),
                    populate: [
                        {
                            path: 'user'
                        },
                        {
                            path: 'category'
                        }
                    ],
                    sort: {
                        name: 1
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
                const events = yield eventMdl_1.default.paginate(query, options);
                return res.status(200).json({
                    events,
                    ok: true
                });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield eventMdl_1.default.find({ status: true });
                return res.status(200).json({
                    events,
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
                const event = yield eventMdl_1.default.findOne({ _id: req.params.id });
                res.status(200).json({ ok: true, event });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body.runners;
                const { id } = req.params;
                // return console.log(body);
                const events = yield eventMdl_1.default.find();
                let runner = [];
                events.forEach((elem) => {
                    elem.runners.forEach((elem2) => {
                        runner.push(elem2.runner);
                    });
                });
                const exist = runner.filter((val) => {
                    return val == body.runner;
                });
                // return console.log(exist)
                if (exist.length === 0) {
                    const event = yield eventMdl_1.default.findOneAndUpdate({
                        _id: id
                    }, {
                        $push: {
                            runners: body
                        }
                    }, {
                        new: true,
                        upsert: true,
                        runValidators: true
                    });
                    res.status(201).json({ ok: true, event });
                }
                else {
                    res.status(400).json({ ok: false, message: 'Ya se registro' });
                }
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
                const event = yield eventMdl_1.default.findOneAndUpdate({ _id: id }, req.body, {
                    new: true
                });
                return res.json({ ok: true, event });
            }
            catch (err) {
                res.status(500).json({ err, ok: false });
            }
        });
    }
}
const eventController = new EventController();
exports.default = eventController;
