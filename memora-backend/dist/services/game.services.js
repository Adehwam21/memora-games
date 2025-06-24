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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../types/app");
class GameSessionService extends app_1.IService {
    constructor(props) {
        super(props);
    }
    addOne(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield this.db.GameModel.create(input);
                yield game.save();
                return game;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getManyByType(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield this.db.GameModel.find({ gametype: input.gameType });
                if (!game) {
                    throw new Error("No game found");
                }
                return game;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getManyByDeveloper(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield this.db.GameModel.find({ developer: input.developer });
                if (!game) {
                    throw new Error("No game found");
                }
                return game;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getOneByID(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield this.db.GameModel.findById(_id);
                if (!game) {
                    throw new Error("No game found");
                }
                return game;
            }
            catch (e) {
                throw e;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const games = yield this.db.GameModel.find();
                if (!games) {
                    throw new Error("No games found");
                }
                return games;
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = GameSessionService;
//# sourceMappingURL=game.services.js.map