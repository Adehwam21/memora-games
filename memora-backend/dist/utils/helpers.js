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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestMMSEScore = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const ai_server_url = config_1.config.aiServer.baseUrl;
const requestMMSEScore = (data, key) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post(`${ai_server_url}/game/predict-mmse/${key}`, data);
    if (res.status !== 200) {
        throw new Error("Couldn't make request to ai server");
    }
    return res.data.predicted_mmse;
});
exports.requestMMSEScore = requestMMSEScore;
//# sourceMappingURL=helpers.js.map