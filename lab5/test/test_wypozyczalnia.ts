
import Samochod from '../src/Samochod';
import Wypozyczalnia from '../src/Wypozyczalnia';
import { expect } from 'chai';

class MockSamochod extends Samochod {
	wypozyczony: boolean;
	constructor(wypozyczony:boolean, uszkodzenia=0, wypozyczenia=0, numer?:number) {
		super(numer, 5, 0);
		this.wypozyczony = wypozyczony;
		if(uszkodzenia !== undefined) {
			for(let i = 0; i < uszkodzenia; ++i) {
				this.uszkodzenia.push("Opis");
			}
		}
		if(wypozyczenia !== undefined) {
			for(let i = 0; i < wypozyczenia; ++i) {
				this.wypozyczenia.push({start: i * 3, end: i * 3 + 1});
			}
		}
	}
	czy_wypozyczony(data:number):boolean {
		return this.wypozyczony;
	}
	czy_dostepny(data_start:number, data_koniec:number):boolean {
		return !this.wypozyczony;
	}
}

describe('Testy wypożyczalni', function() {
	it('test Wypozyczalnia::zlicz_wypozyczone', function() {
		let w = new Wypozyczalnia();
		w.dodaj_samochod(new MockSamochod(true, 0));
		w.dodaj_samochod(new MockSamochod(false, 0));
		w.dodaj_samochod(new MockSamochod(true, 0));
		
		expect(w.zlicz_wypozyczone(3)).to.eql(2);
	});
	
	
	
	it('test Wypozyczalnia::zlicz_wolne_w_zakresie', function() {
		let w = new Wypozyczalnia();
		w.dodaj_samochod(new MockSamochod(true, 0));
		w.dodaj_samochod(new MockSamochod(false, 0));
		w.dodaj_samochod(new MockSamochod(false, 0));

		expect(w.zlicz_wolne_w_zakresie(3,5)).to.eql(2);
	});



	it('test Wypozyczalnia::zlicz_wolne_w_zakresie', function() {
		let w = new Wypozyczalnia();
		w.dodaj_samochod(new MockSamochod(true, 0, 3));
		w.dodaj_samochod(new MockSamochod(false, 0, 8));
		w.dodaj_samochod(new MockSamochod(false, 0, 5));

		let l = w.zlicz_najczescie_wypozyczane(2);

		expect(l.length).to.eql(2);
		expect(l[0].wypozyczenia.length).to.eql(8);
		expect(l[1].wypozyczenia.length).to.eql(5);
	});



	it('test Wypozyczalnia::zlicz_naczesciej_uszkadzane', function() {
		let w = new Wypozyczalnia();
		w.dodaj_samochod(new MockSamochod(true, 3));
		w.dodaj_samochod(new MockSamochod(false, 8));
		w.dodaj_samochod(new MockSamochod(false, 5));

		let l = w.zlicz_najczescie_uszkadzane(2);

		expect(l.length).to.eql(2);
		expect(l[0].uszkodzenia.length).to.eql(8);
		expect(l[1].uszkodzenia.length).to.eql(5);
	});



	it('test Wypozyczalnia::pobierz', function() {
		let w = new Wypozyczalnia();
		let a = new MockSamochod(true, 0, 0, 0);
		let b = new MockSamochod(false, 0, 0, 1);
		let c = new MockSamochod(false, 0, 0, 2);
		
		w.dodaj_samochod(a);
		w.dodaj_samochod(b);
		w.dodaj_samochod(c);
		
		expect(w.pobierz(0)).to.eql(a);
		expect(w.pobierz(1)).to.eql(b);
		expect(w.pobierz(2)).to.eql(c);
		expect(w.pobierz(3)).to.eql(undefined);
	});



	it('test Wypozyczalnia::dodaj_samochod próba dodania nowego samochodu z istniejącym id', function() {
		let w = new Wypozyczalnia();
		let a = new MockSamochod(true, 0, 0, 0);
		let b = new MockSamochod(false, 0, 0, 1);
		let c = new MockSamochod(false, 0, 0, 2);
		let d = new MockSamochod(false, 0, 0, 1);
		w.dodaj_samochod(a);
		w.dodaj_samochod(b);
		w.dodaj_samochod(c);

		expect(()=>{
			w.dodaj_samochod(d);
		}).to.throw(Error);
	});



	it('test Wypozyczalnia::dodaj_samochod próba dodania ponownie już dodanego samochodu', function() {
		let w = new Wypozyczalnia();
		let a = new MockSamochod(true, 0, 0, 0);
		let b = new MockSamochod(false, 0, 0, 1);
		let c = new MockSamochod(false, 0, 0, 2);
		w.dodaj_samochod(a);
		w.dodaj_samochod(b);
		w.dodaj_samochod(c);

		expect(()=>{
			w.dodaj_samochod(c);
		}).to.throw(Error);
	});
});

