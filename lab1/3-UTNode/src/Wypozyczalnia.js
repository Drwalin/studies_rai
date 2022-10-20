
'use strict';

module.exports = class {
	constructor() {
		this.samochody = [];
	}
	
	zlicz_wypozyczone(data) {
		var count = 0;
		for(var i=0; i<this.samochody.length; ++i) {
			if(this.samochody[i].czy_wypozyczony(data)) {
				count++;
			}
		}
		return count;
	}

	zlicz_wolne_w_zakresie(data_start, data_koniec) {
		var count = 0;
		for(var i=0; i<this.samochody.length; ++i) {
			if(this.samochody[i].czy_dostepny(data_start, data_koniec)) {
				count++;
			}
		}
		return count;
	}
	
	zlicz_najczescie_wypozyczane(limit=10) {
		var copy = this.samochody.copy();
		copy.sort((l, r)=>{
			return r.wypozyczenia.length - l.wypozyczenia.length;
		});
		if(limit < copy.length)
			limit = copy.length;
		return copy.slice(0, limit);
	}
	
	zlicz_najczescie_uszkadzane(limit=10) {
		var copy = this.samochody.copy();
		copy.sort((l, r)=>{
			return r.uszkodzenia.length - l.uszkodzenia.length;
		});
		if(limit < copy.length)
			limit = copy.length;
		return copy.slice(0, limit);
	}

	pobierz(id) {
		for(var i=0; i<this.samochody.length; ++i) {
			if(this.samochody[i].numer === id) {
				return this.samochody[i].numer;
			}
		}
		return undefined;
	}

	dodaj_samochod(samochod) {
		if(this.pobierz(samochod.numer) !== undefined) {
			throw new Error("Samochód z numerem: " + samochod.numer + ", już istnieje");
		}
		this.samochody.push(samochod);
	}
};


