import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { IAuthResponse, IUserInput, ILoginInput } from '../types/user.types';

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '24h',
  });
};

export const register = async (
  req: Request<{}, {}, IUserInput>,
  res: Response<IAuthResponse | { message: string; errors?: any }>
) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    const existingUser = await User.findByEmail(validatedData.email);

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create(validatedData);

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (
  req: Request<{}, {}, ILoginInput>,
  res: Response<IAuthResponse | { message: string; errors?: any }>
) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    const user = await User.findByEmail(validatedData.email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await user.comparePassword(validatedData.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
