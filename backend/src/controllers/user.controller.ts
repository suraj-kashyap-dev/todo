import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import User from '../models/User';

export const index = async (request: AuthRequest, response: Response) => {
    try {
        const user = await User.findById(request.userId).select('-password');

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        response.json(user);
    } catch (error) {
        response.status(500).json({ message: 'Server error' });
    }
}

export const update = async (request: AuthRequest, response: Response) => {
    try {
        const allowedUpdates = ['firstName', 'lastName', 'email', 'bio', 'role', 'phoneNumber', 'address', 'company'];

        const updates = Object.keys(request.body)
            .filter(key => allowedUpdates.includes(key))
            .reduce((obj, key) => ({
                ...obj,
                [key]: request.body[key]
            }), {});

        const user = await User.findByIdAndUpdate(
            request.userId,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (! user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.json(user);
    } catch (error) {
        return response.status(500).json({ message: 'Server error' });
    }
}