"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
exports.Wypozyczalnia = exports.WypozyczalniaAsync = void 0;
let DEBUG = (x) => {
    console.log("Debug   ", x);
};
class WypozyczalniaAsync {
    constructor(cache) {
        this.cache = cache;
    }
    zlicz_wypozyczone(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            var cars = yield this.cache.get_all();
            for (let i = 0; i < cars.length; ++i) {
                if (cars[i].czy_wypozyczony(data)) {
                    count++;
                }
            }
            return count;
        });
    }
    zlicz_wolne_w_zakresie(data_start, data_koniec) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = 0;
            var cars = yield this.cache.get_all();
            for (let i = 0; i < cars.length; ++i) {
                if (cars[i].czy_dostepny(data_start, data_koniec)) {
                    count++;
                }
            }
            return count;
        });
    }
    zlicz_najczescie_wypozyczane(limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            var copy = yield this.cache.get_all();
            copy.sort((l, r) => {
                return r.wypozyczenia.length - l.wypozyczenia.length;
            });
            if (limit < copy.length)
                limit = copy.length;
            return copy.slice(0, limit - 1);
        });
    }
    zlicz_najczescie_uszkadzane(limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            var copy = yield this.cache.get_all();
            copy.sort((l, r) => {
                return r.uszkodzenia.length - l.uszkodzenia.length;
            });
            if (limit < copy.length)
                limit = copy.length;
            return copy.slice(0, limit - 1);
        });
    }
    pobierz(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cache.read(id);
        });
    }
    dodaj_samochod(samochod) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cache.has(samochod.numer)) {
                throw new Error(`Samochód z numerem: ${samochod.numer}, już istnieje`);
            }
            return this.cache.write(samochod);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cache.remove_all();
        });
    }
    update(samochod) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cache.write(samochod);
        });
    }
}
exports.WypozyczalniaAsync = WypozyczalniaAsync;
;
/*
export class WypozyczalniaAsyncWrapper {

    wyp: WypozyczalniaAsync;

    constructor() {
        DEBUG(11);
        this.wyp = new WypozyczalniaAsync(new Cache());
        this.clear();
        DEBUG(12);
    }

    zlicz_wypozyczone(data:number):number {
        DEBUG(13);
        var ret: number=0;
        Promise.all([this.wyp.zlicz_wypozyczone(data).then((v)=>{ret = v;})]);
        DEBUG(14);
        return ret;
    }

    zlicz_wolne_w_zakresie(data_start:number, data_koniec:number):number {
        DEBUG(15);
        var ret: number=0;
        Promise.all([this.wyp.zlicz_wolne_w_zakresie(data_start, data_koniec).then((v)=>{ret = v;})]);
        DEBUG(16);
        return ret;
    }
    
    zlicz_najczescie_wypozyczane(limit:number=10):Samochod[] {
        DEBUG(17);
        var ret: Samochod[] = [];
        Promise.all([this.wyp.zlicz_najczescie_wypozyczane(limit).then((v)=>{ret = v;})]);
        DEBUG(18);
        return ret;
    }
    
    zlicz_najczescie_uszkadzane(limit:number=10):Samochod[] {
        DEBUG(19);
        var ret: Samochod[] = [];
        Promise.all([this.wyp.zlicz_najczescie_uszkadzane(limit).then((v)=>{ret = v;})]);
        DEBUG(110);
        return ret;
    }

    pobierz(id:number):Samochod|undefined {
        DEBUG(111);
        var ret: Samochod|undefined;
        Promise.all([this.wyp.pobierz(id).then((v)=>{ret = v;})]);
        DEBUG(112);
        return ret;
    }

    dodaj_samochod(samochod:Samochod) {
        DEBUG(113);
        this.wyp.dodaj_samochod(samochod);
        DEBUG(114);
    }

    clear() {
        DEBUG(115);
        this.wyp.clear();
        DEBUG(116);
    }
}
*/
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
exports.Wypozyczalnia = Wypozyczalnia;
_Wypozyczalnia_samochody = new WeakMap();
;
