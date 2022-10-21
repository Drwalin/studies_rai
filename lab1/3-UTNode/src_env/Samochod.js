'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var SAMOCHOD_GLOBAL_COUNTER = BigInt(1000000000) * BigInt(1000000000) * BigInt(1000000000);
module.exports = /*#__PURE__*/function () {
  function _class(numer, pasazerowie, cena) {
    _classCallCheck(this, _class);
    this.numer = numer === undefined ? ++SAMOCHOD_GLOBAL_COUNTER : numer;
    this.pasazerowie = pasazerowie;
    this.cena = cena;
    this.uszkodzenia = [];
    this.wypozyczenia = [];
  }
  _createClass(_class, [{
    key: "wypozycz",
    value: function wypozycz(data) {
      if (this.wypozyczenia.length === 0) {
        this.wypozyczenia.push({
          start: data
        });
      } else {
        var last = this.wypozyczenia[this.wypozyczenia.length - 1];
        if (last.end === undefined) {
          throw new Error("Nie mo\u017Cna wypo\u017Cyczy\u0107 samochodu: ".concat(this.numer, ", poniewa\u017C nie zosta\u0142 on zwr\xF3cony"));
        } else if (data <= last.end) {
          throw new Error("Nie mo\u017Cna wypo\u017Cyczy\u0107 samochodu w dacie: ".concat(this.numer, ", w dacie: ").concat(data, ", poniewa\u017C by\u0142 ju\u017C wypo\u017Cyczony p\xF3\u017Aniej."));
        } else {
          this.wypozyczenia.push({
            start: data
          });
        }
      }
    }
  }, {
    key: "zwroc",
    value: function zwroc(data) {
      if (this.wypozyczenia.length === 0) {
        throw new Error("Nie mo\u017Cna zwr\xF3ci\u0107 samochodu: ".concat(this.numer, ", poniewa\u017C nie zosta\u0142 on wyop\u017Cyczony."));
      } else {
        var last = this.wypozyczenia[this.wypozyczenia.length - 1];
        if (last.end !== undefined) {
          throw new Error("Nie mo\u017Cna zwr\xF3ci\u0107 samochodu: ".concat(this.numer, ", poniewa\u017C nie zosta\u0142 on wypo\u017Cyczony"));
        } else if (last.start <= data) {
          last.end = data;
        } else {
          throw new Error("Nie mo\u017Cna zwr\xF3ci\u0107 samochodu:".concat(this.numer, ", wcze\u015Bniej ni\u017C by\u0142 wypo\u017Cyczony."));
        }
      }
    }
  }, {
    key: "dodaj_uszkodzenie",
    value: function dodaj_uszkodzenie(opis) {
      this.uszkodzenia.push(opis);
    }
  }, {
    key: "czy_wypozyczony",
    value: function czy_wypozyczony(data) {
      for (var i = 0; i < this.wypozyczenia.length; ++i) {
        var _this$wypozyczenia$i = this.wypozyczenia[i],
          start = _this$wypozyczenia$i.start,
          end = _this$wypozyczenia$i.end;
        if (end === undefined) {
          if (start <= data) {
            return true;
          }
        } else if (start <= data && end >= data) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "czy_dostepny",
    value: function czy_dostepny(data_start, data_koniec) {
      for (var i = 0; i < this.wypozyczenia.length; ++i) {
        var _this$wypozyczenia$i2 = this.wypozyczenia[i],
          start = _this$wypozyczenia$i2.start,
          end = _this$wypozyczenia$i2.end;
        if (end === undefined) {
          if (start <= data_koniec) {
            return false;
          }
        } else if (start <= data_koniec && end >= data_start) {
          return false;
        }
      }
      return true;
    }
  }]);
  return _class;
}();