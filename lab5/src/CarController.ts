
import express from "express";
import { Delete, Get, Post, Route, Body, Path, Tags } from "tsoa";
import Cache from "./Cache";
import Samochod from "./Samochod";

interface ICar {
	numer: number;
	pasazerowie: number;
	cena: number;
}

interface IDescription {
	desc: string;
}


@Route("cars")
@Tags("Car")
class CarController {
	cache: Cache;
	constructor(cache: Cache) {
		this.cache = cache;
	}

	@Post("/")
	public async Create(@Body() body: ICar) {
		var s = new Samochod(body.numer, body.pasazerowie, body.cena);
		return this.cache.write(s);
	}


	@Get("/:id")
	public async Read(@Path() id: string): Promise<Samochod|null> {
		const s = this.cache.read(+id);
		if(s === undefined) {
			return null;
		} else {
			return ((s as unknown) as Samochod);
		}
	}

	@Get("/")
	public async ReadAll(): Promise<Samochod[]> {
		return this.cache.get_all();
	}


	@Post("/update")
	public async Update(@Body() b: ICar) {
		var s = await this.cache.read(b.numer);
		if(s !== undefined) {
			s.pasazerowie = b.pasazerowie;
			s.cena = b.cena;
			await this.cache.write(s);
		}
	}


	@Delete("/:id")
	public async Delete(@Path() id: string) {
		return this.cache.remove(Number(id));
	}

	@Delete("/all")
	public async DeleteAll() : Promise<boolean> {
		await this.cache.remove_all();
		return true;
	}



	

	@Post("/borrow/:id/:date")
	public async Borrow(@Path() id: string, @Path() date: string) {
		return this.cache.read(+id).then((s)=>{
			if(s === undefined) {
				return Promise.reject();
			} else {
				s.wypozycz(+date);
				this.cache.write(s);
			}
			return Promise.resolve(true);
		});
	}

	@Post("/return/:id/:date")
	public async Return(@Path() id: string, @Path() date: string) {
		return this.cache.read(+id).then((s)=>{
			if(s === undefined) {
				return Promise.reject();
			} else {
				s.zwroc(+date);
				this.cache.write(s);
			}
			return Promise.resolve(true);
		});
	}

	@Post("/defect/:id")
	public async Defect(@Path() id: string, @Body() body: IDescription) {
		return this.cache.read(+id).then((s) => {
			if (s === undefined) {
				return Promise.reject();
			} else {
				s.dodaj_uszkodzenie(body.desc);
				this.cache.write(s);
			}
			return Promise.resolve(true);
		});
	}
}

const CreateCarController = function (cache: Cache) {
	const router = express.Router();
	router.post("/", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.Create(req.body);
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	router.get("/:id", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.Read(req.params.id);
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	router.get("/", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.ReadAll();
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	router.post("/", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.Update(req.body);
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	router.delete("/:id", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.Delete(req.params.id);
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	router.delete("/all", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.DeleteAll();
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	router.post("/borrow/:id/:date", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.Borrow(req.params.id, req.params.date);
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	router.post("/return/:id/:date", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.Return(req.params.id, req.params.date);
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	router.post("/defect/:id", async (req, res) => {
		try {
			const co = new CarController(cache);
			const r = await co.Defect(req.params.id, req.body);
			return res.send(r);
		} catch {
			return res.sendStatus(500);
		}
	});
	return router;
};

export default CreateCarController;