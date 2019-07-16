"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import categoryRoutes from '../routes/categoryRoutes';
// import indexRoutes from '../routes/indexRoutes';
// import loginRoutes from '../routes/loginRoutes';
// import productRoutes from '../routes/productRoutes';
// import uploadRoutes from '../routes/uploadRoutes';
const categoryRts_1 = __importDefault(require("../routes/categoryRts"));
const eventRts_1 = __importDefault(require("../routes/eventRts"));
const userRts_1 = __importDefault(require("../routes/userRts"));
const loginRts_1 = __importDefault(require("../routes/loginRts"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    config() {
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/categories', categoryRts_1.default);
        this.app.use('/api/events', eventRts_1.default);
        this.app.use('/api/login', loginRts_1.default);
        this.app.use('/api/users', userRts_1.default);
        // this.app.use('/api/categories', categoryRoutes);
        // this.app.use('/api/upload', uploadRoutes);
    }
    start() {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server On Port: ${port}`);
        });
    }
}
exports.default = Server;
