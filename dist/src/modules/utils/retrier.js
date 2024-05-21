"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retrier = void 0;
const tslib_1 = require("tslib");
const logtrace_1 = tslib_1.__importDefault(require("../utils/logtrace"));
class Retrier {
    constructor(actionTitle, func, options = {}) {
        this.actionTitle = actionTitle || "";
        this.func = func;
        this.totalRetries = options.totalRetries || 3;
        this.secondsMultiplier = options.secondsMultiplier || 5;
    }
    attempt() {
        return tslib_1.__awaiter(this, arguments, void 0, function* (retryCount = 1) {
            try {
                const result = yield this.func();
                return result;
            }
            catch (err) {
                logtrace_1.default.error(err.message || err);
                if (retryCount >= this.totalRetries) {
                    logtrace_1.default.error(`${this.actionTitle} attempt ${retryCount} / ${this.totalRetries} failed. Giving up!`);
                    throw err;
                }
                const seconds = retryCount * this.secondsMultiplier;
                logtrace_1.default.error(`${this.actionTitle} attempt ${retryCount} / ${this.totalRetries} failed. Retrying in ${seconds} seconds!`);
                yield this._wait(seconds);
                return this.attempt(retryCount + 1);
            }
        });
    }
    _wait(seconds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                const ms = seconds * 1000;
                setTimeout(resolve, ms);
            });
        });
    }
}
exports.Retrier = Retrier;
//# sourceMappingURL=retrier.js.map