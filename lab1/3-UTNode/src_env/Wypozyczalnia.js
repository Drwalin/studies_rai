'use strict';

var _samochody;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
module.exports = (_samochody = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function () {
  function _class2() {
    _classCallCheck(this, _class2);
    _classPrivateFieldInitSpec(this, _samochody, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _samochody, []);
  }
  _createClass(_class2, [{
    key: "zlicz_wypozyczone",
    value: function zlicz_wypozyczone(data) {
      var count = 0;
      for (var i = 0; i < _classPrivateFieldGet(this, _samochody).length; ++i) {
        if (_classPrivateFieldGet(this, _samochody)[i].czy_wypozyczony(data)) {
          count++;
        }
      }
      return count;
    }
  }, {
    key: "zlicz_wolne_w_zakresie",
    value: function zlicz_wolne_w_zakresie(data_start, data_koniec) {
      var count = 0;
      for (var i = 0; i < _classPrivateFieldGet(this, _samochody).length; ++i) {
        if (_classPrivateFieldGet(this, _samochody)[i].czy_dostepny(data_start, data_koniec)) {
          count++;
        }
      }
      return count;
    }
  }, {
    key: "zlicz_najczescie_wypozyczane",
    value: function zlicz_najczescie_wypozyczane() {
      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var copy = _classPrivateFieldGet(this, _samochody).slice(0);
      copy.sort(function (l, r) {
        return r.wypozyczenia.length - l.wypozyczenia.length;
      });
      if (limit < copy.length) limit = copy.length;
      return copy.slice(0, limit - 1);
    }
  }, {
    key: "zlicz_najczescie_uszkadzane",
    value: function zlicz_najczescie_uszkadzane() {
      var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var copy = _classPrivateFieldGet(this, _samochody).slice(0);
      copy.sort(function (l, r) {
        return r.uszkodzenia.length - l.uszkodzenia.length;
      });
      if (limit < copy.length) limit = copy.length;
      return copy.slice(0, limit - 1);
    }
  }, {
    key: "pobierz",
    value: function pobierz(id) {
      for (var i = 0; i < _classPrivateFieldGet(this, _samochody).length; ++i) {
        if (_classPrivateFieldGet(this, _samochody)[i].numer === id) {
          return _classPrivateFieldGet(this, _samochody)[i];
        }
      }
      return undefined;
    }
  }, {
    key: "dodaj_samochod",
    value: function dodaj_samochod(samochod) {
      if (this.pobierz(samochod.numer) !== undefined) {
        for (var i = 0; i < _classPrivateFieldGet(this, _samochody).length; ++i) {
          if (_classPrivateFieldGet(this, _samochody)[i] == samochod) {
            throw new Error("Samoch\xF3d: ".concat(samochod.numer, " zosta\u0142 ju\u017C dodany"));
          }
        }
        throw new Error("Samoch\xF3d z numerem: ".concat(samochod.numer, ", ju\u017C istnieje"));
      }
      _classPrivateFieldGet(this, _samochody).push(samochod);
    }
  }]);
  return _class2;
}());