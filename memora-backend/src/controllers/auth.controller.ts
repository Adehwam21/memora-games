import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { _User, IRegisterUserInput } from '../types/user';
import { config } from '../config';
import { comparePassword, hashPassword } from '../utils/authUtils';

// Register User
export const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password, age, gender, smokingStatus, medicalCondition, educationLevel, drinkingStatus }: IRegisterUserInput = req.body;

    try {
        const existingUser = await req.context!.services!.user.getOne({ username });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await hashPassword(password);
        await req.context!.services!.user.addOne({
            username,
            email,
            password: hashedPassword,
            age,
            gender,
            smokingStatus,
            medicalCondition,
            educationLevel,
            drinkingStatus,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

// Login User
export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const user = await req.context!.services!.user!.getOne({ username });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        ;
        const token = jwt.sign({userId: user.userId, username: user!.username, role: user.role}, config.auth.secret, { expiresIn: config.auth.expiresIn });

        res.json({ token, user, message: 'Logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;

        const _user = await req.context!.services!.user!.getOne({ username: user!.username });
        if (!_user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ user: _user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};
