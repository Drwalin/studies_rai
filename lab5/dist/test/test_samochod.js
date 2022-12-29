"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Samochod_1 = __importDefault(require("../src/Samochod"));
const chai_1 = require("chai");
/*
let expect = chai.expect;
let describe = chai.describe();
let it = chai.it();
*/
describe('Testy samochodów', function () {
    it('test Samochod::wypozycz pierwsze wypożyczenie', function () {
        let s = new Samochod_1.default(1, 2, 3000);
        s.wypozycz(1);
        (0, chai_1.expect)(s.czy_wypozyczony(0)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(1)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(2)).to.eql(true);
    });
    it('test Samochod::wypozycz drugie wypożyczenie poprawne', function () {
        let s = new Samochod_1.default(1, 2, 1000);
        s.wypozycz(1);
        s.zwroc(2);
        s.wypozycz(4);
        (0, chai_1.expect)(s.czy_wypozyczony(0)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(1)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(2)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(3)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(4)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(5)).to.eql(true);
    });
    it('test Samochod::wypozycz próba wypożyczenia już wypożyczonego samochodu', function () {
        let s = new Samochod_1.default(1, 2, 1000);
        let data = 13;
        s.wypozycz(1);
        (0, chai_1.expect)(() => {
            s.wypozycz(2);
        }).to.throw(Error);
        (0, chai_1.expect)(s.czy_wypozyczony(0)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(1)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(2)).to.eql(true);
    });
    it('test Samochod::wypozycz próba wypożyczenia przed ostatnim zwróceniem', function () {
        let s = new Samochod_1.default(1, 2, 2000);
        let data = 13;
        s.wypozycz(1);
        s.zwroc(2);
        (0, chai_1.expect)(() => {
            s.wypozycz(0);
        }).to.throw(Error);
        (0, chai_1.expect)(s.czy_wypozyczony(0)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(1)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(2)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(3)).to.eql(false);
    });
    it('test Samochod::zwroc zwrócenie', function () {
        let s = new Samochod_1.default(1, 2, 3);
        s.wypozycz(1);
        s.zwroc(2);
        (0, chai_1.expect)(s.czy_wypozyczony(0)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(1)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(2)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(3)).to.eql(false);
    });
    it('test Samochod::zwroc zwrócenie tego samego dnia', function () {
        let s = new Samochod_1.default(1, 2, 3);
        s.wypozycz(1);
        s.zwroc(1);
        (0, chai_1.expect)(s.czy_wypozyczony(0)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(1)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(2)).to.eql(false);
    });
    it('test Samochod::zwroc próba zwrócenia przed wypożyczeniem', function () {
        let s = new Samochod_1.default(1, 2, 3);
        s.wypozycz(2);
        (0, chai_1.expect)(() => {
            s.zwroc(1);
        }).to.throw(Error);
        (0, chai_1.expect)(s.czy_wypozyczony(0)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(1)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(2)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(3)).to.eql(true);
    });
    it('test Samochod::zwroc próba zwrócenia nigdy nie wypożyczanego samochodu', function () {
        let s = new Samochod_1.default(1, 2, 3);
        (0, chai_1.expect)(() => {
            s.zwroc(1);
        }).to.throw(Error);
    });
    it('test Samochod::zwroc próba zwrócenia raz wypożyczonego i zwróconego samochodu', function () {
        let s = new Samochod_1.default(1, 2, 3);
        s.wypozycz(1);
        s.zwroc(2);
        (0, chai_1.expect)(() => {
            s.zwroc(4);
        }).to.throw(Error);
        (0, chai_1.expect)(s.czy_wypozyczony(0)).to.eql(false);
        (0, chai_1.expect)(s.czy_wypozyczony(1)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(2)).to.eql(true);
        (0, chai_1.expect)(s.czy_wypozyczony(3)).to.eql(false);
    });
    it('test Samochod::dodaj_uszkodzenie', function () {
        let s = new Samochod_1.default(1, 2, 3);
        s.dodaj_uszkodzenie("defekt");
        (0, chai_1.expect)(s.uszkodzenia[0]).to.eql("defekt");
    });
    it('test Samochod::czy_dostepny', function () {
        let s = new Samochod_1.default(1, 2, 3);
        s.wypozycz(1);
        s.zwroc(3);
        s.wypozycz(9);
        (0, chai_1.expect)(s.czy_dostepny(-1, 0)).to.eql(true);
        (0, chai_1.expect)(s.czy_dostepny(0, 1)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(-1, 2)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(-1, 3)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(-1, 4)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(-1, 5)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(1, 2)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(1, 3)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(2, 3)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(3, 3)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(3, 4)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(3, 5)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(4, 4)).to.eql(true);
        (0, chai_1.expect)(s.czy_dostepny(4, 5)).to.eql(true);
        (0, chai_1.expect)(s.czy_dostepny(5, 5)).to.eql(true);
        (0, chai_1.expect)(s.czy_dostepny(2, 9)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(4, 10)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(9, 10)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(10, 10)).to.eql(false);
        (0, chai_1.expect)(s.czy_dostepny(10, 11)).to.eql(false);
    });
    it('test Samochod::constructor automatyczy numer pojazdu', () => {
        let a = new Samochod_1.default();
        let b = new Samochod_1.default();
        (0, chai_1.expect)(a.numer).to.not.eql(b.numer);
    });
});
