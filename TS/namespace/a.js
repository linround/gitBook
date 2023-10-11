"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = exports.MName = void 0;
var MName;
(function (MName) {
    var T = /** @class */ (function () {
        function T() {
        }
        return T;
    }());
    var t = 't';
    var B = /** @class */ (function () {
        function B() {
            this.name = '';
        }
        B.prototype.test = function () {
            return this.name;
        };
        return B;
    }());
    MName.B = B;
})(MName = exports.MName || (exports.MName = {}));
exports.a = {
    name: 'a'
};
