import {
    Request,
    Response
} from 'express';
import { ITagInput, ITagResponse } from '../types/tag.types';
import { tagSchema } from '../validators/tag.validator';
import Tag from '../models/tag.model';

export const store = async (
    request: Request<{}, {}, ITagInput>,
    response: Response<ITagResponse | { message: string; errors?: any }>
) => {
    try {
        const validatedData = tagSchema.parse(request.body);

        const existingTag = await Tag.findByTitle(validatedData.title);

        if (existingTag) {
            return response.status(400).json({ message: 'Tag is already registered' });
        }

        const tag = await Tag.create(validatedData);

        return response.status(201).json({
            title: tag.title,
            status: tag.status,
            createdAt: tag.createdAt,
        });
    } catch (error: any) {
        if (error.errors) {
            return response.status(400).json({ message: 'Validation error', errors: error.errors });
        }

        return response.status(500).json({ 
            message: 'Server error',
            error: error,
        });
    }
};
