'use strict';

module.exports = function () {
  this.Pojazd = function (id, max_predkosc, predkosc) {
    this.getPredkosc = function () {
      return predkosc;
    };
    this.status = function () {
      Console.log(id, " ", max_predkosc, " ", predkosc);
    };
    this.start = function (_predkosc) {
      predkosc = _predkosc;
    };
    this.stop = function () {
      predkosc = 0;
    };
  };
  this.Pojazd2 = function (id, max_predkosc, predkosc) {
    this.id = id;
    this.max_predkosc = max_predkosc;
    this.predkosc = predkosc;
  };
  this.Pojazd2.prototype = {};
  this.Pojazd2.prototype.status = function () {
    Console.log(this.id, " ", this.max_predkosc, " ", this.predkosc);
  };
  this.Pojazd2.prototype.start = function (_predkosc) {
    this.predkosc = _predkosc;
  };
  this.Pojazd2.prototype.stop = function () {
    this.predkosc = 0;
  };
};