'use strict';
let expect = require('chai').expect;
let Wypozyczalnia = require('../src/Wypozyczalnia');
var MOCK_SAMOCHOD_NUMER = 0;
class MockSamochod {
    constructor(wypozyczony, uszkodzenia = 0, wypozyczenia = 0, numer = undefined) {
        this.numer = (numer === undefined) ? MOCK_SAMOCHOD_NUMER++ : numer;
        this.wypozyczony = wypozyczony;
        this.uszkodzenia = [];
        if (uszkodzenia !== undefined) {
            for (let i = 0; i < uszkodzenia; ++i) {
                this.uszkodzenia.push("Opis");
            }
        }
        this.wypozyczenia = [];
        if (wypozyczenia !== undefined) {
            for (let i = 0; i < wypozyczenia; ++i) {
                this.wypozyczenia.push({ start: i * 3, end: i * 3 + 1 });
            }
        }
    }
    czy_wypozyczony(data) {
        return this.wypozyczony;
    }
    czy_dostepny(data_start, data_koniec) {
        return !this.wypozyczony;
    }
}
describe('Testy wypożyczalni', function () {
    it('test Wypozyczalnia::zlicz_wypozyczone', function () {
        let w = new Wypozyczalnia();
        w.dodaj_samochod(new MockSamochod(true, 0));
        w.dodaj_samochod(new MockSamochod(false, 0));
        w.dodaj_samochod(new MockSamochod(true, 0));
        expect(w.zlicz_wypozyczone(3)).to.eql(2);
    });
    it('test Wypozyczalnia::zlicz_wolne_w_zakresie', function () {
        let w = new Wypozyczalnia();
        w.dodaj_samochod(new MockSamochod(true, 0));
        w.dodaj_samochod(new MockSamochod(false, 0));
        w.dodaj_samochod(new MockSamochod(false, 0));
        expect(w.zlicz_wolne_w_zakresie(3, 5)).to.eql(2);
    });
    it('test Wypozyczalnia::zlicz_wolne_w_zakresie', function () {
        let w = new Wypozyczalnia();
        w.dodaj_samochod(new MockSamochod(true, 0, 3));
        w.dodaj_samochod(new MockSamochod(false, 0, 8));
        w.dodaj_samochod(new MockSamochod(false, 0, 5));
        let l = w.zlicz_najczescie_wypozyczane(2);
        expect(l.length).to.eql(2);
        expect(l[0].wypozyczenia.length).to.eql(8);
        expect(l[1].wypozyczenia.length).to.eql(5);
    });
    it('test Wypozyczalnia::zlicz_naczesciej_uszkadzane', function () {
        let w = new Wypozyczalnia();
        w.dodaj_samochod(new MockSamochod(true, 3));
        w.dodaj_samochod(new MockSamochod(false, 8));
        w.dodaj_samochod(new MockSamochod(false, 5));
        let l = w.zlicz_najczescie_uszkadzane(2);
        expect(l.length).to.eql(2);
        expect(l[0].uszkodzenia.length).to.eql(8);
        expect(l[1].uszkodzenia.length).to.eql(5);
    });
    it('test Wypozyczalnia::pobierz', function () {
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
    it('test Wypozyczalnia::dodaj_samochod próba dodania nowego samochodu z istniejącym id', function () {
        let w = new Wypozyczalnia();
        let a = new MockSamochod(true, 0, 0, 0);
        let b = new MockSamochod(false, 0, 0, 1);
        let c = new MockSamochod(false, 0, 0, 2);
        let d = new MockSamochod(false, 0, 0, 1);
        w.dodaj_samochod(a);
        w.dodaj_samochod(b);
        w.dodaj_samochod(c);
        expect(() => {
            w.dodaj_samochod(d);
        }).to.throw(Error);
    });
    it('test Wypozyczalnia::dodaj_samochod próba dodania ponownie już dodanego samochodu', function () {
        let w = new Wypozyczalnia();
        let a = new MockSamochod(true, 0, 0, 0);
        let b = new MockSamochod(false, 0, 0, 1);
        let c = new MockSamochod(false, 0, 0, 2);
        w.dodaj_samochod(a);
        w.dodaj_samochod(b);
        w.dodaj_samochod(c);
        expect(() => {
            w.dodaj_samochod(c);
        }).to.throw(Error);
    });
});
