
export default class Samochod {

	numer: number;
	pasazerowie: number;
	cena: number;
	uszkodzenia: String[];
	wypozyczenia: any[];

	constructor(numer:number, pasazerowie:number=5, cena:number=5) {
		this.numer = numer;
		this.pasazerowie = pasazerowie;
		this.cena = cena;
		this.uszkodzenia = [];
		this.wypozyczenia = [];
	}

	wypozycz(data:number) {
		if(this.wypozyczenia.length === 0) {
			this.wypozyczenia.push({start:data});
		} else {
			let last = this.wypozyczenia[this.wypozyczenia.length-1];
			if(last.end === undefined) {
				throw new Error(`Nie można wypożyczyć samochodu: ${this.numer}, ponieważ nie został on zwrócony`);
			} else if(data <= last.end) {
				throw new Error(`Nie można wypożyczyć samochodu w dacie: ${this.numer}, w dacie: ${data}, ponieważ był już wypożyczony później.`);
			} else {
				this.wypozyczenia.push({start:data});
			}
		}
	}
	
	zwroc(data:number) {
		if(this.wypozyczenia.length === 0) {
			throw new Error(`Nie można zwrócić samochodu: ${this.numer}, ponieważ nie został on wyopżyczony.`);
		} else {
			let last = this.wypozyczenia[this.wypozyczenia.length-1];
			if(last.end !== undefined) {
				throw new Error(`Nie można zwrócić samochodu: ${this.numer}, ponieważ nie został on wypożyczony`);
			} else if(last.start <= data) {
				last.end = data;
			} else {
				throw new Error(`Nie można zwrócić samochodu:${this.numer}, wcześniej niż był wypożyczony.`);
			}
		}
	}
	
	dodaj_uszkodzenie(opis:string) {
		this.uszkodzenia.push(opis);
	}
	
	czy_wypozyczony(data:number):boolean {
		for(let i=0; i<this.wypozyczenia.length; ++i) {
			let {start, end} = this.wypozyczenia[i];
			if(end === undefined) {
				if(start <= data) {
					return true;
				}
			} else if(start <= data && end >= data) {
				return true;
			}
		}
		return false;
	}
	
	czy_dostepny(data_start:number, data_koniec:number):boolean {
		for(let i=0; i<this.wypozyczenia.length; ++i) {
			let {start, end} = this.wypozyczenia[i];
			if(end === undefined) {
				if(start <= data_koniec) {
					return false;
				}
			} else if(start <= data_koniec && end >= data_start) {
				return false;
			}
		}
		return true;
	}
};

