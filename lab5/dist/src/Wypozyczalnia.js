"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Wypozyczalnia_samochody;
Object.defineProperty(exports, "__esModule", { value: true });
class Wypozyczalnia {
    constructor() {
        _Wypozyczalnia_samochody.set(this, void 0);
        __classPrivateFieldSet(this, _Wypozyczalnia_samochody, [], "f");
    }
    zlicz_wypozyczone(data) {
        let count = 0;
        for (let i = 0; i < __classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f").length; ++i) {
            if (__classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f")[i].czy_wypozyczony(data)) {
                count++;
            }
        }
        return count;
    }
    zlicz_wolne_w_zakresie(data_start, data_koniec) {
        let count = 0;
        for (let i = 0; i < __classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f").length; ++i) {
            if (__classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f")[i].czy_dostepny(data_start, data_koniec)) {
                count++;
            }
        }
        return count;
    }
    zlicz_najczescie_wypozyczane(limit = 10) {
        let copy = __classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f").slice(0);
        copy.sort((l, r) => {
            return r.wypozyczenia.length - l.wypozyczenia.length;
        });
        if (limit < copy.length)
            limit = copy.length;
        return copy.slice(0, limit - 1);
    }
    zlicz_najczescie_uszkadzane(limit = 10) {
        let copy = __classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f").slice(0);
        copy.sort((l, r) => {
            return r.uszkodzenia.length - l.uszkodzenia.length;
        });
        if (limit < copy.length)
            limit = copy.length;
        return copy.slice(0, limit - 1);
    }
    pobierz(id) {
        for (let i = 0; i < __classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f").length; ++i) {
            if (__classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f")[i].numer === id) {
                return __classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f")[i];
            }
        }
        return undefined;
    }
    dodaj_samochod(samochod) {
        if (this.pobierz(samochod.numer) !== undefined) {
            for (let i = 0; i < __classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f").length; ++i) {
                if (__classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f")[i] == samochod) {
                    throw new Error(`Samochód: ${samochod.numer} został już dodany`);
                }
            }
            throw new Error(`Samochód z numerem: ${samochod.numer}, już istnieje`);
        }
        __classPrivateFieldGet(this, _Wypozyczalnia_samochody, "f").push(samochod);
    }
}
exports.default = Wypozyczalnia;
_Wypozyczalnia_samochody = new WeakMap();
;
