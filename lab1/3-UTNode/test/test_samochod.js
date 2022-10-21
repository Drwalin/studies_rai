
'use strict';

let expect = require('chai').expect;
let Samochod = require('../src/Samochod');

describe('Testy samochodów', function() {
	it('test Samochod::wypozycz pierwsze wypożyczenie', function() {
		let s = new Samochod(1, 2, 3_000);

		s.wypozycz(1);

		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
	});
	
	it('test Samochod::wypozycz drugie wypożyczenie poprawne', function() {
		let s = new Samochod(1, 2, 1_000);
		s.wypozycz(1);
		s.zwroc(2);

		s.wypozycz(4);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
		expect(s.czy_wypozyczony(3)).to.eql(false);
		expect(s.czy_wypozyczony(4)).to.eql(true);
		expect(s.czy_wypozyczony(5)).to.eql(true);
	});
	
	it('test Samochod::wypozycz próba wypożyczenia już wypożyczonego samochodu', function() {
		let s = new Samochod(1, 2, 1_000);
		let data = 13;
		s.wypozycz(1);

		expect(()=>{
			s.wypozycz(2);
		}).to.throw(Error);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
	});
	
	it('test Samochod::wypozycz próba wypożyczenia przed ostatnim zwróceniem', function() {
		let s = new Samochod(1, 2, 2_000);
		let data = 13;
		s.wypozycz(1);
		s.zwroc(2);

		expect(()=>{
			s.wypozycz(0);
		}).to.throw(Error);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
		expect(s.czy_wypozyczony(3)).to.eql(false);
	});




	
	it('test Samochod::zwroc zwrócenie', function() {
		let s = new Samochod(1, 2, 3);
		s.wypozycz(1);

		s.zwroc(2);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
		expect(s.czy_wypozyczony(3)).to.eql(false);
	});
	
	it('test Samochod::zwroc zwrócenie tego samego dnia', function() {
		let s = new Samochod(1, 2, 3);
		s.wypozycz(1);

		s.zwroc(1);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(false);
	});
	
	it('test Samochod::zwroc próba zwrócenia przed wypożyczeniem', function() {
		let s = new Samochod(1, 2, 3);
		s.wypozycz(2);

		expect(()=>{
			s.zwroc(1);
		}).to.throw(Error);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(false);
		expect(s.czy_wypozyczony(2)).to.eql(true);
		expect(s.czy_wypozyczony(3)).to.eql(true);
	});
	
	it('test Samochod::zwroc próba zwrócenia nigdy nie wypożyczanego samochodu', function() {
		let s = new Samochod(1, 2, 3);

		expect(()=>{
			s.zwroc(1);
		}).to.throw(Error);
	});
	
	it('test Samochod::zwroc próba zwrócenia raz wypożyczonego i zwróconego samochodu', function() {
		let s = new Samochod(1, 2, 3);
		s.wypozycz(1);
		s.zwroc(2);

		expect(()=>{
			s.zwroc(4);
		}).to.throw(Error);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
		expect(s.czy_wypozyczony(3)).to.eql(false);
	});




	
	it('test Samochod::dodaj_uszkodzenie', function() {
		let s = new Samochod(1, 2, 3);

		s.dodaj_uszkodzenie("defekt");

		expect(s.uszkodzenia[0]).to.eql("defekt");
	});




	
	it('test Samochod::czy_dostepny', function() {
		let s = new Samochod(1, 2, 3);
		s.wypozycz(1);
		s.zwroc(3);
		s.wypozycz(9);

		expect(s.czy_dostepny(-1, 0)).to.eql(true);
		
		expect(s.czy_dostepny(0, 1)).to.eql(false);
		expect(s.czy_dostepny(-1, 2)).to.eql(false);
		expect(s.czy_dostepny(-1, 3)).to.eql(false);
		expect(s.czy_dostepny(-1, 4)).to.eql(false);
		expect(s.czy_dostepny(-1, 5)).to.eql(false);
		expect(s.czy_dostepny(1, 2)).to.eql(false);
		expect(s.czy_dostepny(1, 3)).to.eql(false);
		expect(s.czy_dostepny(2, 3)).to.eql(false);
		expect(s.czy_dostepny(3, 3)).to.eql(false);
		expect(s.czy_dostepny(3, 4)).to.eql(false);
		expect(s.czy_dostepny(3, 5)).to.eql(false);
		
		expect(s.czy_dostepny(4, 4)).to.eql(true);
		expect(s.czy_dostepny(4, 5)).to.eql(true);
		expect(s.czy_dostepny(5, 5)).to.eql(true);

		expect(s.czy_dostepny(2, 9)).to.eql(false);
		expect(s.czy_dostepny(4, 10)).to.eql(false);
		expect(s.czy_dostepny(9, 10)).to.eql(false);
		expect(s.czy_dostepny(10, 10)).to.eql(false);
		expect(s.czy_dostepny(10, 11)).to.eql(false);
	});
	
	
	
	
	it('test Samochod::constructor automatyczy numer pojazdu', ()=>{
		let a = new Samochod();
		let b = new Samochod();
		
		expect(a.numer).to.not.eql(b.numer);
	});
});

