
import Samochod from './Samochod';
import * as fs from 'fs';

class Cache {

	ids: Set<number> = new Set();
	elems: Map<number, Samochod> = new Map();

	directory: string;

	constructor() {
		var c:string = fs.readFileSync('config.txt', 'utf8');
		this.directory = c.trim();
		var dirs = fs.promises.readdir(this.directory);
		dirs.then((value:string[])=>{
			for(var i=0; i<value.length; ++i) {
				this.ids.add(+value);
			}
		}, null);
		Promise.all([dirs]);
	}

	write(samochod:Samochod) {
		if(this.ids.has(samochod.numer) == false) {
			this.ids.add(samochod.numer);
		}
		this.elems.set(samochod.numer, samochod);
		return fs.promises.writeFile(this.directory+'/'+samochod.numer, JSON.stringify(samochod));
	}

	read(id:number):Promise<Samochod|undefined> {
		if(this.ids.has(id)) {
			if(this.elems.has(id)) {
				return Promise.resolve(this.elems.get(id));
			} else {
				return fs.promises.readFile(this.directory+'/'+id, 'utf-8').then(
					(data:string)=>{
						var s = JSON.parse(data) as Samochod;
						if(this.elems.has(id) == false) {
							this.elems.set(id, s);
						}
						return this.elems.get(id);
					}
				);
			}
		}
		return Promise.reject();
	}
	
	get_available_ids():number[] {
		var ret:number[] = [];
		this.ids.forEach((v)=>{
			ret.push(v);
		});
		return ret;
	}
}

export default class Wypozyczalnia2 {
	
	cache: Cache;
	
	constructor(cache:Cache) {
		this.cache = cache;
	}
	
	zlicz_wypozyczone(data:number):Promise<number> {
		let count = 0;
		let i = 0;
		var promise = Promise.resolve(0);
		var promises = [promise];
		this.cache.get_available_ids().forEach((v)=>{
			promises[0] = promises[0].then((v)=>{
				if()
			});
		});
		for(let i=0; i<ids.le; ++i) {
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

export default class Wypozyczalnia {
	
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

