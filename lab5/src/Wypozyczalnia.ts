
import Samochod from './Samochod';

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

