"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
class Cache {
    constructor() {
        this.ids = new Set();
        this.elems = new Map();
        var c = fs.readFileSync('config.txt', 'utf8');
        this.directory = c.trim();
        var dirs = fs.promises.readdir(this.directory);
        dirs.then((value) => {
            for (var i = 0; i < value.length; ++i) {
                this.ids.add(+value);
            }
        }, null);
        Promise.all([dirs]);
    }
    write(samochod) {
        if (this.ids.has(samochod.numer) == false) {
            this.ids.add(samochod.numer);
        }
        this.elems.set(samochod.numer, samochod);
        return fs.promises.writeFile(this.directory + '/' + samochod.numer, JSON.stringify(samochod));
    }
    read(id) {
        if (this.ids.has(id)) {
            if (this.elems.has(id)) {
                return Promise.resolve(this.elems.get(id));
            }
            else {
                return fs.promises.readFile(this.directory + '/' + id, 'utf-8').then((data) => {
                    var s = JSON.parse(data);
                    if (this.elems.has(id) == false) {
                        this.elems.set(id, s);
                    }
                    return this.elems.get(id);
                });
            }
        }
        return Promise.reject();
    }
}
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
