import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IRegisterUserInput } from '../types/user';
import { config } from '../config';
import { comparePassword, hashPassword } from '../utils/authUtils';

export const register = async (req: Request, res: Response) => {
    const {
        username,
        email,
        password,
        age,
        gender,
        smokingStatus,
        medicalCondition,
        drinkingStatus }: IRegisterUserInput = req.body;

    try {
        const existingUser = await req.context.services.user.getOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        await req.context.services.user.addOne({
            username,
            email,
            password: hashedPassword,
            age,
            gender,
            smokingStatus,
            medicalCondition,
            drinkingStatus
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find user by email
        const user = await req.context.services.user.getOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ user: user }, config.auth.secret, {
            expiresIn: config.auth.expiresIn,
        });

        res.json({ token, user, message: 'Logged in successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const { user } = req['user'];

        // Find user by ID
        const _user = await req.context.services.user.getOne({ username: user.username });
        if (!_user) {
            console.log("failed");
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user: _user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};