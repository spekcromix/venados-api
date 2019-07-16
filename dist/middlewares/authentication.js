"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
exports.AUTH = {
    verifyToken(req, res, next) {
        let token = req.get('token');
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    err,
                    mensaje: 'Token no válido',
                    ok: false
                });
            }
            req.user = decoded.user;
            next();
        });
    },
    verifyAdmin(req, res, next) {
        let user = req.user;
        if (user.role === 'ADMIN') {
            next();
        }
        else {
            return res.status(401).json({
                mensaje: 'El user no es ADMIN',
                ok: false
            });
        }
    },
    verifyAdminSameUser(req, res, next) {
        const user = req.user;
        const id = req.params._id;
        if (user.role === 'ADMIN' || user._id === id) {
            next();
            return;
        }
        else {
            return res.status(401).json({
                mensaje: 'Token incorrecto - No es ADMIN o el USUARIO LOGUEADO',
                ok: false
            });
        }
    },
    verifyTokenImg(req, res, next) {
        let token = req.query.token;
        jwt.verify(token, process.env.SEED, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    err,
                    mensaje: 'Token no válido',
                    ok: false
                });
            }
            req.user = decoded.user;
            next();
        });
    }
};
