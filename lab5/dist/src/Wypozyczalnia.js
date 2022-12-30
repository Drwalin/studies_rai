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
exports.Wypozyczalnia = exports.WypozyczalniaAsyncWrapper = exports.WypozyczalniaAsync = void 0;
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
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ids.has(samochod.numer) == false) {
                this.ids.add(samochod.numer);
            }
            this.elems.set(samochod.numer, samochod);
            return fs.promises.writeFile(this.get_path(samochod.numer), JSON.stringify(samochod));
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ids.has(id)) {
                if (this.elems.has(id)) {
                    return Promise.resolve(this.elems.get(id));
                }
                else {
                    return fs.promises.readFile(this.get_path(id), 'utf-8').then((data) => {
                        var s = JSON.parse(data);
                        if (this.elems.has(id) == false) {
                            this.elems.set(id, s);
                        }
                        return this.elems.get(id);
                    });
                }
            }
            return Promise.reject();
        });
    }
    get_available_ids() {
        var ret = [];
        this.ids.forEach((v) => {
            ret.push(v);
        });
        return ret;
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ids.has(id)) {
                if (this.elems.has(id)) {
                    this.elems.delete(id);
                }
                return fs.promises.rm(this.get_path(id));
            }
            return Promise.reject();
        });
    }
    get_path(id) {
        return this.directory + '/' + id;
    }
    has(id) {
        return this.ids.has(id);
    }
    get_all() {
        return __awaiter(this, void 0, void 0, function* () {
            var copy = [];
            var ar = this.get_available_ids();
            for (var i = 0; i < ar.length; ++i) {
                var s = yield this.read(ar[i]);
                if (s === undefined) {
                }
                else {
                    copy.push(s);
                }
            }
            return copy;
        });
    }
    remove_all() {
        while (this.ids.size != 0) {
            var v = 0;
            for (let e of this.ids) {
                v = e;
            }
            Promise.all([this.remove(v)]);
        }
    }
}
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
        if (this.cache.has(samochod.numer)) {
            throw new Error(`Samochód z numerem: ${samochod.numer}, już istnieje`);
        }
        this.cache.write(samochod);
    }
    clear() {
        this.cache.remove_all();
    }
}
exports.WypozyczalniaAsync = WypozyczalniaAsync;
;
class WypozyczalniaAsyncWrapper {
    constructor() {
        this.wyp = new WypozyczalniaAsync(new Cache());
    }
    zlicz_wypozyczone(data) {
        var ret = 0;
        Promise.all([this.wyp.zlicz_wypozyczone(data).then((v) => { ret = v; })]);
        return ret;
    }
    zlicz_wolne_w_zakresie(data_start, data_koniec) {
        var ret = 0;
        Promise.all([this.wyp.zlicz_wolne_w_zakresie(data_start, data_koniec).then((v) => { ret = v; })]);
        return ret;
    }
    zlicz_najczescie_wypozyczane(limit = 10) {
        var ret = [];
        Promise.all([this.wyp.zlicz_najczescie_wypozyczane(limit).then((v) => { ret = v; })]);
        return ret;
    }
    zlicz_najczescie_uszkadzane(limit = 10) {
        var ret = [];
        Promise.all([this.wyp.zlicz_najczescie_uszkadzane(limit).then((v) => { ret = v; })]);
        return ret;
    }
    pobierz(id) {
        var ret;
        Promise.all([this.wyp.pobierz(id).then((v) => { ret = v; })]);
        return ret;
    }
    dodaj_samochod(samochod) {
        this.wyp.dodaj_samochod(samochod);
    }
    clear() {
        this.wyp.clear();
    }
}
exports.WypozyczalniaAsyncWrapper = WypozyczalniaAsyncWrapper;
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
