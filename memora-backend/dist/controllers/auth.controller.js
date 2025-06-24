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
exports.getUserProfile = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authUtils_1 = require("../utils/authUtils");
// Register User
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { username, email, password, age, gender, smokingStatus, medicalCondition, educationLevel, drinkingStatus }: IRegisterUserInput = req.body;
    const { username, password, email } = req.body;
    try {
        const existingUser = yield req.context.services.user.getOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = yield (0, authUtils_1.hashPassword)(password);
        yield req.context.services.user.addOne({
            username,
            email,
            password: hashedPassword,
            age: 0,
            gender: 'Other',
            smokingStatus: false,
            medicalCondition: '',
            educationLevel: '',
            drinkingStatus: false,
        });
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.register = register;
// Login User
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield req.context.services.user.getOne({ username });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        const isPasswordValid = yield (0, authUtils_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        ;
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            userId: user.userId,
            email: user.email,
            username: user.username,
            role: user.role
        }, config_1.config.auth.secret, {
            expiresIn: config_1.config.auth.expiresIn
        });
        res.status(200).json({
            token,
            user: {
                userId: user.userId,
                email: user.email,
                username: user.username,
                role: user.role
            },
            message: 'Logged in successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.login = login;
// Get User Profile
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const _user = yield req.context.services.user.getOne({ username: user.username });
        if (!_user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user: _user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=auth.controller.js.map