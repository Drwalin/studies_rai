"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const Cache_1 = __importDefault(require("./src/Cache"));
const Wypozyczalnia_1 = require("./src/Wypozyczalnia");
const CarController_1 = __importDefault(require("./src/CarController"));
const BorrowController_1 = __importDefault(require("./src/BorrowController"));
const cache = new Cache_1.default();
const wypozyczalnia = new Wypozyczalnia_1.WypozyczalniaAsync(cache);
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.static("public"));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
const Router = express_1.default.Router();
Router.use("/cars", (0, CarController_1.default)(cache));
Router.use("/borrows", (0, BorrowController_1.default)(wypozyczalnia));
app.use(Router);
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
