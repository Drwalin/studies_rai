var expect = require('chai').expect;
var Samochod = require('../src/Samochod');

describe('Testy samochodów', function() {
	it('test Samochod::wypozycz pierwsze wypożyczenie', function() {
		var s = new Samochod(1, 2, 3);

		s.wypozycz(1);

		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
	});
	
	it('test Samochod::wypozycz drugie wypożyczenie poprawne', function() {
		var s = new Samochod(1, 2, 3);
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
		var s = new Samochod(1, 2, 3);
		var data = 13;
		s.wypozycz(1);

		expect(()=>{
			s.wypozycz(2);
		}).to.throw(Error);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
	});
	
	it('test Samochod::wypozycz próba wypożyczenia przed ostatnim zwróceniem', function() {
		var s = new Samochod(1, 2, 3);
		var data = 13;
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
		var s = new Samochod(1, 2, 3);
		s.wypozycz(1);

		s.zwroc(2);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(true);
		expect(s.czy_wypozyczony(3)).to.eql(false);
	});
	
	it('test Samochod::zwroc zwrócenie tego samego dnia', function() {
		var s = new Samochod(1, 2, 3);
		s.wypozycz(1);

		s.zwroc(1);
		
		expect(s.czy_wypozyczony(0)).to.eql(false);
		expect(s.czy_wypozyczony(1)).to.eql(true);
		expect(s.czy_wypozyczony(2)).to.eql(false);
	});
	
	it('test Samochod::zwroc próba zwrócenia przed wypożyczeniem', function() {
		var s = new Samochod(1, 2, 3);
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
		var s = new Samochod(1, 2, 3);

		expect(()=>{
			s.zwroc(1);
		}).to.throw(Error);
	});
	
	it('test Samochod::zwroc próba zwrócenia raz wypożyczonego i zwróconego samochodu', function() {
		var s = new Samochod(1, 2, 3);
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
		var s = new Samochod(1, 2, 3);

		s.dodaj_uszkodzenie("defekt");

		expect(s.uszkodzenia[0]).to.eql("defekt");
	});




	
	it('test Samochod::czy_dostepny', function() {
		var s = new Samochod(1, 2, 3);
		s.dodaj_uszkodzenie("defekt");

		throw "";

		expect(s.uszkodzenia[0]).to.eql("defekt");
	});



});

