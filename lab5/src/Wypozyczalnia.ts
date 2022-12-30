
import Samochod from './Samochod';
import Cache from './Cache';

let DEBUG = (x:any) => {
	console.log("Debug   ", x);
};

export class WypozyczalniaAsync {
	
	cache: Cache;
	
	constructor(cache:Cache) {
		this.cache = cache;
	}


	async zlicz_wypozyczone(data:number):Promise<number> {
		let count = 0;
		var cars:Samochod[] = await this.cache.get_all();
		for(let i=0; i<cars.length; ++i) {
			if(cars[i].czy_wypozyczony(data)) {
				count++;
			}
		}
		return count;
	}

	async zlicz_wolne_w_zakresie(data_start:number, data_koniec:number):Promise<number> {
		let count = 0;
		var cars:Samochod[] = await this.cache.get_all();
		for(let i=0; i<cars.length; ++i) {
			if(cars[i].czy_dostepny(data_start, data_koniec)) {
				count++;
			}
		}
		return count;
	}
	
	async zlicz_najczescie_wypozyczane(limit:number=10):Promise<Samochod[]> {
		var copy:Samochod[] = await this.cache.get_all();
		copy.sort((l, r)=>{
			return r.wypozyczenia.length - l.wypozyczenia.length;
		});
		if(limit < copy.length)
			limit = copy.length;
		return copy.slice(0, limit-1);
	}
	
	async zlicz_najczescie_uszkadzane(limit:number=10):Promise<Samochod[]> {
		var copy:Samochod[] = await this.cache.get_all();
		copy.sort((l, r)=>{
			return r.uszkodzenia.length - l.uszkodzenia.length;
		});
		if(limit < copy.length)
			limit = copy.length;
		return copy.slice(0, limit-1);
	}

	async pobierz(id:number):Promise<Samochod|undefined> {
		return this.cache.read(id);
	}

	async dodaj_samochod(samochod:Samochod) {
		if(this.cache.has(samochod.numer)) {
			throw new Error(`Samochód z numerem: ${samochod.numer}, już istnieje`);
		}
		return this.cache.write(samochod);
	}

	async clear() {
		return this.cache.remove_all();
	}
	
	async update(samochod: Samochod) {
		return this.cache.write(samochod);
	}
	





	/*
	zlicz_wypozyczone(data:number):Promise<number> {
		let count = 0;
		var promise = Promise.resolve(0);
		var ar = this.cache.get_available_ids();
		for(var i=0; i<ar.length; ++i) {
			promise = promise.then((v)=>{
				var p =this.cache.read(ar[i]);
				p.then((s)=>{
					if(s === undefined) {
					} else if(s?.czy_wypozyczony(data)) {
						v++;
					}
				});
				Promise.all([p]);
				return v;
			});
		}
		return promise;
	}
	
	async zlicz_wypozyczone(data:number):Promise<number> {
		var count:number = 0;
		var ar = this.cache.get_available_ids();
		for(var i=0; i<ar.length; ++i) {
			var s:Samochod|undefined = await this.cache.read(ar[i]);
			if(s === undefined) {
			} else if(s?.czy_wypozyczony(data)) {
				count++;
			}
		}
		return count;
	}
	*/

	/*
	async zlicz_wypozyczone(data:number):Promise<number> {
		var count:number = 0;
		var ar = this.cache.get_available_ids();
		for(var i=0; i<ar.length; ++i) {
			var s:Samochod|undefined = await this.cache.read(ar[i]);
			if(s === undefined) {
			} else if(s?.czy_wypozyczony(data)) {
				count++;
			}
		}
		return count;
	}

	async zlicz_wolne_w_zakresie(data_start:number, data_koniec:number):Promise<number> {
		var count:number = 0;
		var ar = this.cache.get_available_ids();
		for(var i=0; i<ar.length; ++i) {
			var s:Samochod|undefined = await this.cache.read(ar[i]);
			if(s === undefined) {
			} else if(s?.czy_dostepny(data_start, data_koniec)) {
				count++;
			}
		}
		return count;
	}
	
	async zlicz_najczescie_wypozyczane(limit:number=10):Promise<Samochod[]> {
		var copy:Samochod[] = [];
		var ar = this.cache.get_available_ids();
		for(var i=0; i<ar.length; ++i) {
			var s:Samochod|undefined = await this.cache.read(ar[i]);
			if(s === undefined) {
			} else {
				copy.push(s);
			}
		}
		copy.sort((l, r)=>{
			return r.wypozyczenia.length - l.wypozyczenia.length;
		});
		if(limit < copy.length)
			limit = copy.length;
		return copy.slice(0, limit-1);
	}
	
	zlicz_najczescie_uszkadzane(limit:number=10):Samochod[] {
		var copy:Samochod[] = [];
		var ar = this.cache.get_available_ids();
		for(var i=0; i<ar.length; ++i) {
			var s:Samochod|undefined = await this.cache.read(ar[i]);
			if(s === undefined) {
			} else {
				copy.push(s);
			}
		}




		copy.sort((l, r)=>{
			return r.uszkodzenia.length - l.uszkodzenia.length;
		});
		if(limit < copy.length)
			limit = copy.length;
		return copy.slice(0, limit-1);
	}
	*/

	/*
	pobierz(id:number):Samochod|undefined {
		for(let i=0; i<this.#samochody.length; ++i) {
			if(this.#samochody[i].numer === id) {
				return this.#samochody[i];
			}
		}
		return undefined;
	}

	dodaj_samochod(samochod:Samochod) {
		if(this.pobierz(samochod.numer) !== undefined) {
			for(let i=0; i<this.#samochody.length; ++i) {
				if(this.#samochody[i] == samochod) {
					throw new Error(`Samochód: ${samochod.numer} został już dodany`);
				}
			}
			throw new Error(`Samochód z numerem: ${samochod.numer}, już istnieje`);
		}
		this.#samochody.push(samochod);
	}
	*/
};

/*
export class WypozyczalniaAsyncWrapper {

	wyp: WypozyczalniaAsync;

	constructor() {
		DEBUG(11);
		this.wyp = new WypozyczalniaAsync(new Cache());
		this.clear();
		DEBUG(12);
	}

	zlicz_wypozyczone(data:number):number {
		DEBUG(13);
		var ret: number=0;
		Promise.all([this.wyp.zlicz_wypozyczone(data).then((v)=>{ret = v;})]);
		DEBUG(14);
		return ret;
	}

	zlicz_wolne_w_zakresie(data_start:number, data_koniec:number):number {
		DEBUG(15);
		var ret: number=0;
		Promise.all([this.wyp.zlicz_wolne_w_zakresie(data_start, data_koniec).then((v)=>{ret = v;})]);
		DEBUG(16);
		return ret;
	}
	
	zlicz_najczescie_wypozyczane(limit:number=10):Samochod[] {
		DEBUG(17);
		var ret: Samochod[] = [];
		Promise.all([this.wyp.zlicz_najczescie_wypozyczane(limit).then((v)=>{ret = v;})]);
		DEBUG(18);
		return ret;
	}
	
	zlicz_najczescie_uszkadzane(limit:number=10):Samochod[] {
		DEBUG(19);
		var ret: Samochod[] = [];
		Promise.all([this.wyp.zlicz_najczescie_uszkadzane(limit).then((v)=>{ret = v;})]);
		DEBUG(110);
		return ret;
	}

	pobierz(id:number):Samochod|undefined {
		DEBUG(111);
		var ret: Samochod|undefined;
		Promise.all([this.wyp.pobierz(id).then((v)=>{ret = v;})]);
		DEBUG(112);
		return ret;
	}

	dodaj_samochod(samochod:Samochod) {
		DEBUG(113);
		this.wyp.dodaj_samochod(samochod);
		DEBUG(114);
	}

	clear() {
		DEBUG(115);
		this.wyp.clear();
		DEBUG(116);
	}
}
*/

export class Wypozyczalnia {
	
	#samochody: Samochod[];
	
	constructor() {
		this.#samochody = [];
	}
	
	zlicz_wypozyczone(data:number):number {
		let count = 0;
		for(let i=0; i<this.#samochody.length; ++i) {
			if(this.#samochody[i].czy_wypozyczony(data)) {
				count++;
			}
		}
		return count;
	}

	zlicz_wolne_w_zakresie(data_start:number, data_koniec:number):number {
		let count = 0;
		for(let i=0; i<this.#samochody.length; ++i) {
			if(this.#samochody[i].czy_dostepny(data_start, data_koniec)) {
				count++;
			}
		}
		return count;
	}
	
	zlicz_najczescie_wypozyczane(limit:number=10):Samochod[] {
		let copy = this.#samochody.slice(0);
		copy.sort((l, r)=>{
			return r.wypozyczenia.length - l.wypozyczenia.length;
		});
		if(limit < copy.length)
			limit = copy.length;
		return copy.slice(0, limit-1);
	}
	
	zlicz_najczescie_uszkadzane(limit:number=10):Samochod[] {
		let copy = this.#samochody.slice(0);
		copy.sort((l, r)=>{
			return r.uszkodzenia.length - l.uszkodzenia.length;
		});
		if(limit < copy.length)
			limit = copy.length;
		return copy.slice(0, limit-1);
	}

	pobierz(id:number):Samochod|undefined {
		for(let i=0; i<this.#samochody.length; ++i) {
			if(this.#samochody[i].numer === id) {
				return this.#samochody[i];
			}
		}
		return undefined;
	}

	dodaj_samochod(samochod:Samochod) {
		if(this.pobierz(samochod.numer) !== undefined) {
			for(let i=0; i<this.#samochody.length; ++i) {
				if(this.#samochody[i] == samochod) {
					throw new Error(`Samochód: ${samochod.numer} został już dodany`);
				}
			}
			throw new Error(`Samochód z numerem: ${samochod.numer}, już istnieje`);
		}
		this.#samochody.push(samochod);
	}
};

