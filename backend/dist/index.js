"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const apiV1_1 = __importDefault(require("./routes/apiV1"));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Todo Is on');
});
app.listen(3000, () => {
    console.log('Server is running on port 3000, Click here http://localhost:3000/');
});
app.use('/api/v1/', apiV1_1.default);
