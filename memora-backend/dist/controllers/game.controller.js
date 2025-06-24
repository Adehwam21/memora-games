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
exports.getAllGames = exports.createGame = void 0;
const createGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            throw new Error("Not authorized");
        }
        const developer = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString();
        const game = yield req.context.services.game.addOne(Object.assign(Object.assign({}, req.body), { developer, stars: 0 }));
        res.status(201).json({ message: "Game added", game });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.createGame = createGame;
const getAllGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield req.context.services.game.getAll();
        if (!games) {
            res.status(404).json({ message: "No games found" });
            return;
        }
        res.status(200).json({ message: "Games found", games });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.getAllGames = getAllGames;
//# sourceMappingURL=game.controller.js.map