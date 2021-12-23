var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// Import
var _a = require('@polkadot/api'), ApiPromise = _a.ApiPromise, WsProvider = _a.WsProvider;
// Construct
var connect = function () { return __awaiter(_this, void 0, void 0, function () {
    var wsProvider, api;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wsProvider = new WsProvider('wss://rpc.polkadot.io');
                return [4 /*yield*/, ApiPromise.create({ provider: wsProvider })];
            case 1:
                api = _a.sent();
                // Do something
                return [2 /*return*/, api];
        }
    });
}); };
connect().then(function (api) { return __awaiter(_this, void 0, void 0, function () {
    var add, now, _a, nonce, balance, chain, lastHeader, count, unsubHeads, unsub;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                add = '13HtFCrxyz55KgkPWcnhHPwE8f8GmZrfXR3uC6jNrihGzmqz';
                return [4 /*yield*/, api.query.timestamp.now()];
            case 1:
                now = _b.sent();
                return [4 /*yield*/, api.query.system.account(add)];
            case 2:
                _a = _b.sent(), nonce = _a.nonce, balance = _a.data;
                console.log("".concat(now, ": balance of ").concat(balance.free, " and a nonce of ").concat(nonce));
                return [4 /*yield*/, api.rpc.system.chain()];
            case 3:
                chain = _b.sent();
                return [4 /*yield*/, api.rpc.chain.getHeader()];
            case 4:
                lastHeader = _b.sent();
                // Log the information
                console.log("".concat(chain, ": last block #").concat(lastHeader.number, " has hash ").concat(lastHeader.hash));
                count = 0;
                return [4 /*yield*/, api.rpc.chain.subscribeNewHeads(function (lastHeader) {
                        console.log("Last block #".concat(lastHeader.number, " has hash ").concat(lastHeader.hash));
                        var hash = lastHeader.hash, number = lastHeader.number;
                        console.log("Block number ".concat(number.toNumber(), " has hash ").concat(hash));
                        if (count++ === 20) {
                            unsub();
                            unsubHeads();
                        }
                    })];
            case 5:
                unsubHeads = _b.sent();
                return [4 /*yield*/, api.derive.chain.subscribeNewHeads(function (lastHeader) {
                        console.log("#".concat(lastHeader.number, " was authored by ").concat(lastHeader.author));
                    })];
            case 6:
                unsub = _b.sent();
                console.log(count);
                console.log(count);
                console.log(count);
                return [2 /*return*/];
        }
    });
}); })["catch"](function (err) {
    console.error(err);
})["finally"](function () { return process.exit(); });
