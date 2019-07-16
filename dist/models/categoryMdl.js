"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const categoryModel = new Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    name: {
        type: String,
        index: true,
        unique: true,
        lowercase: true,
        required: [true, 'El nombre es requerido']
    },
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
exports.default = mongoose_1.default.model('Category', categoryModel);
