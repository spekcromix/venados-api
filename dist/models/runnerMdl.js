"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const Schema = mongoose_1.default.Schema;
const runnerModel = new Schema({
    runners: [
        {
            event: {
                type: Schema.Types.ObjectId,
                ref: 'Event',
            },
            distance: {
                type: String,
                required: [true, 'Las Distancia es requerida']
            },
            runner: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            shirtSize: {
                type: String,
                required: [true, 'La Talla de Playera es requerida'],
            }
        }
    ]
});
runnerModel.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Runner', runnerModel);
