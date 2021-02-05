"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/web.timers.js");

var foo = function foo(x) {
  return x + 2;
};

var str = "hello gulp";
console.log(str);
var p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('hello');
  }, 1000);
});
p1.then(function (res) {
  console.log(res);
});