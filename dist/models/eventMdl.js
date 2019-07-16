"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const Schema = mongoose_1.default.Schema;
const eventModel = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        required: [true, 'La Fecha es requerida'],
    },
    description: {
        type: String,
        required: [true, 'La Descripción es requerida']
    },
    distances: [
        {
            type: String,
            required: [true, 'Las Distancia es requerida']
        }
    ],
    hour: {
        type: String,
        required: [true, 'La Hora es requerida']
    },
    img: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: [true, 'El Nombre es requerido'],
        index: true,
        unique: true
    },
    place: {
        type: String,
        required: [true, 'El Lugar es requerido'],
    },
    price: {
        type: Number,
        required: [true, 'El Precio es requerido']
    },
    runners: [
        {
            distance: {
                type: String
            },
            runner: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            shirtSize: {
                type: String
            }
        }
    ],
    status: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
eventModel.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('Event', eventModel);
