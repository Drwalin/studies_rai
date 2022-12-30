
import express from "express";
import { Delete, Get, Post, Route, Body, Path, Tags } from "tsoa";
import Cache from "./Cache";
import { WypozyczalniaAsync } from "./Wypozyczalnia";
import Samochod from "./Samochod";

interface IBorrow {
	numer: number;
	pasazerowie: number;
	cena: number;
}

@Route("borrows")
@Tags("Borrow")
class BorrowController {
	wyp: WypozyczalniaAsync;
	constructor(wyp: WypozyczalniaAsync) {
		this.wyp = wyp;
	}
	
	@Get("/count_borrowed/:date")
	public async CountBorrowed(@Path() date: string): Promise<number> {
		return this.wyp.zlicz_wypozyczone(+date);
	}
	
	@Get("/count_free/:date/:dateend")
	public async CountFree(@Path() date: string, @Path() dateend: string): Promise<number> {
		return this.wyp.zlicz_wolne_w_zakresie(+date, +dateend);
	}
	
	@Get("/frequent_borrow")
	public async FrequentBorrow(): Promise<Samochod[]> {
		return this.wyp.zlicz_najczescie_wypozyczane();
	}
	
	@Get("/frequent_defect")
	public async FrequentDefect(): Promise<Samochod[]> {
		return this.wyp.zlicz_najczescie_uszkadzane();
	}
}

const CreateBorrowController = function(wyp: WypozyczalniaAsync) {
	const router = express.Router();
	router.get("/count_borrowed/:date", async (req, res) => {
		try {
			const co = new BorrowController(wyp);
			const r = await co.CountBorrowed(req.params.date);
			return res.send(""+r);
		} catch (e) {
			return res.sendStatus(666);
		}
	});
	router.get("/count_free/:date/:dateend", async (req, res) => {
		try {
			const co = new BorrowController(wyp);
			const r = await co.CountFree(req.params.date, req.params.dateend);
			return res.send(""+r);
		} catch (e) {
			return res.sendStatus(666);
		}
	});
	router.get("/frequent_borrow", async (req, res) => {
		try {
			const co = new BorrowController(wyp);
			const r = await co.FrequentBorrow();
			return res.send(r);
		} catch (e) {
			return res.sendStatus(666);
		}
	});
	router.get("/frequent_defect", async (req, res) => {
		try {
			const co = new BorrowController(wyp);
			const r = await co.FrequentDefect();
			return res.send(r);
		} catch (e) {
			return res.sendStatus(666);
		}
	});
	return router;
};

export default CreateBorrowController;