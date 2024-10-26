import { Request, Response } from 'express';
import { IMedia, IMediaInput, IMediaFileResponse, IMessageResponse } from '../types/media.types';
import Media from '../models/media.model';

export const index = async (
    request: Request,
    response: Response<IMediaFileResponse[] | IMessageResponse>
) => {
    try {
        const files = await Media.find();
        const fileResponses = files.map(file => ({
            id: file._id,
            message: 'File fetched successfully',
            file: {
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype,
                createdAt: file.createdAt,
                userId: file.userId,
            },
        }));
        response.status(200).json(fileResponses);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Failed to fetch media files' });
    }
};

// Upload a single media file
export const upload = async (
    request: Request<{}, {}, IMediaInput>,
    response: Response<IMediaFileResponse | IMessageResponse>
) => {
    try {
        const { filename, originalname, path, size, mimetype, userId } = request.body;
        const mediaFile = new Media({ filename, originalname, path, size, mimetype, userId });
        await mediaFile.save();

        response.status(201).json({
            id: mediaFile._id,
            message: 'File uploaded successfully',
            file: {
                filename: mediaFile.filename,
                originalname: mediaFile.originalname,
                path: mediaFile.path,
                size: mediaFile.size,
                mimetype: mediaFile.mimetype,
                createdAt: mediaFile.createdAt,
                userId: mediaFile.userId,
            },
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'File upload failed' });
    }
};

// Upload multiple media files
export const uploads = async (
    request: Request<{}, {}, IMediaInput[]>,
    response: Response<IMediaFileResponse[] | IMessageResponse>
) => {
    try {
        const mediaFiles = request.body.map(fileData => new Media(fileData));
        const savedFiles = await Media.insertMany(mediaFiles);

        const fileResponses = savedFiles.map(file => ({
            id: file._id,
            message: 'File uploaded successfully',
            file: {
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype,
                createdAt: file.createdAt,
                userId: file.userId,
            },
        }));

        response.status(201).json(fileResponses);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Multiple file upload failed' });
    }
};

// Retrieve a specific media file by ID
export const show = async (
    request: Request<{ id: string }>,
    response: Response<IMediaFileResponse | IMessageResponse>
) => {
    try {
        const file = await Media.findById(request.params.id);
        if (!file) {
            return response.status(404).json({ message: 'File not found' });
        }
        response.status(200).json({
            id: file._id,
            message: 'File retrieved successfully',
            file: {
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype,
                createdAt: file.createdAt,
                userId: file.userId,
            },
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Failed to retrieve file' });
    }
};

// Delete a specific media file by ID
export const destroy = async (
    request: Request<{ id: string }>,
    response: Response<IMessageResponse>
) => {
    try {
        const file = await Media.findByIdAndDelete(request.params.id);
        if (!file) {
            return response.status(404).json({ message: 'File not found' });
        }
        response.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Failed to delete file' });
    }
};
import { json } from 'express';
import path from 'path';
import { map } from 'zod';

