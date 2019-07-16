"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const rolesValidos = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol valido'
};
const Schema = mongoose_1.default.Schema;
const userModel = new Schema({
    address: {
        type: String,
        required: [true, 'El Domicilio es requerido'],
    },
    age: {
        type: String,
        required: [true, 'La Edad es requerida'],
    },
    birthDate: {
        type: Date,
        required: [true, 'La Fecha de Nacimiento es requerida'],
    },
    cellPhone: {
        type: String,
        required: [true, 'El Telefono es requerido']
    },
    city: {
        type: String,
        required: [true, 'La Ciudad es requerida']
    },
    cPostal: {
        type: String,
        required: [true, 'El Codigo Postal es requerido']
    },
    colony: {
        type: String,
        required: [true, 'La Colonia es requerida']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: [true, 'El Email es requerido'],
        index: true,
        unique: true,
        lowercase: true
    },
    firstName: {
        type: String,
        required: [true, 'El Nombre es requerido']
    },
    img: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: [true, 'Los Apellidos son requeridos']
    },
    password: {
        type: String,
        required: [true, 'La Contraseña es requerida']
    },
    role: {
        type: String,
        default: 'USER',
        enum: rolesValidos
    },
    state: {
        type: String,
        required: [true, 'El Estado es requerido']
    },
    status: {
        type: Boolean,
        default: true
    }
});
userModel.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
userModel.plugin(mongoose_paginate_1.default);
exports.default = mongoose_1.default.model('User', userModel);
