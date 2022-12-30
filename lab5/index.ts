import "reflect-metadata";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { Delete, Get, Post, Route, Body, Path, Tags } from "tsoa";

import Cache from "./src/Cache";
import { WypozyczalniaAsync } from "./src/Wypozyczalnia";
import Samochod from "./src/Samochod";

import CreateCarController from "./src/CarController";
import CreateBorrowController from "./src/BorrowController";

const cache = new Cache();
const wypozyczalnia = new WypozyczalniaAsync(cache);


const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(undefined, {
		swaggerOptions: {
			url: "/swagger.json",
		},
	})
);

const Router = express.Router();
Router.use("/cars", CreateCarController(cache));
Router.use("/borrows", CreateBorrowController(wypozyczalnia));
app.use(Router);

app.listen(PORT, () => {
	console.log("Server is running on port", PORT);
});
