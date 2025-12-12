import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { _User, IRegisterUserInput } from '../types/user';
import { config } from '../config';
import { comparePassword, hashPassword } from '../utils/authUtils';

// Register User
export const register = async (req: Request, res: Response): Promise<void> => {
    // const { username, email, password, age, gender, smokingStatus, medicalCondition, educationLevel, drinkingStatus }: IRegisterUserInput = req.body;
    const { username, password, email } = req.body;

    let existingUser: any;

    try {
        if (username) {
            existingUser = await req.context!.services!.user.getByUsername({ username });
        } else if (email) {
            existingUser = await req.context!.services!.user.getByEmail({ email });
        }

        if (existingUser) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await hashPassword(password);

        const user = await req.context!.services!.user.addOne({
            username,
            email,
            password: hashedPassword,
        });

        if (!user) {
            res.status(404).json({ message: "Couldn't create user" });
            return;
        }

        const token = jwt.sign({
            _id: user!._id,
            userId: user!.userId,
            email: user!.email,
            username: user!.username,
            age: user.age,
            educationLevel: user.educationLevel,
            role: user!.role
        },
            config.auth.secret,
            {
                expiresIn: config.auth.expiresIn
            });

        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};

// Login User
export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    console.log(username, email, password)

    try {
        if (!email && !username) {
            res.status(400).json({ message: "Please provide email or username" });
            return;
        }

        const user = email
            ? await req.context!.services!.user!.getByEmail({ email })
            : await req.context!.services!.user!.getByUsername({ username });
        console.log(user);

        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        // check password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        // create token
        const token = jwt.sign(
            {
                _id: user._id,
                userId: user.userId,
                email: user.email,
                username: user.username,
                age: user.age,
                educationLevel: user.educationLevel,
                role: user.role
            },
            config.auth.secret,
            { expiresIn: config.auth.expiresIn }
        );

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                userId: user.userId,
                email: user.email,
                username: user.username,
                age: user.age,
                educationLevel: user.educationLevel,
                role: user.role
            },
            message: "Logged in successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: 'Unauthorized' });
            return;
        }

        const _user = await req.context!.services!.user!.getByUsername({ username: user!.username });
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

// Update User Profile
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(404).json({ message: 'Unauthorized' });
            return;
        }

        const updateData = req.body

        const _user = await req.context!.services!.user!.updateOne(updateData, { user: user });
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
