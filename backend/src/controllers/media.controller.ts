import { Request, Response } from 'express';
import { IMediaInput, IMediaFileResponse, IMessageResponse } from '../types/media.types';
import Media from '../models/media.model';

export const index = async (
    request: Request,
    response: Response<IMediaFileResponse[] | IMessageResponse>
) => {
    try {
        const files = await Media.find().sort({ createdAt: -1 });

        const fileResponses = files.map(file => ({
            id: file._id,
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
            createdAt: file.createdAt,
        }));

        return response.status(200).json(fileResponses);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Failed to fetch media files' });
    }
};

export const upload = async (
    request: Request<{}, {}, IMediaInput>,
    response: Response<IMediaFileResponse | IMessageResponse>
) => {
    try {
        const file = request.file;

        if (! file) {
            return response.status(400).json({ message: "File is required" });
        }

        const media = await Media.create({
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
        })

        return response.status(200).json({
            id: media.id,
            filename: media.filename,
            originalname: media.originalname,
            path: media.path,
            size: media.size,
            mimetype: media.mimetype,
            createdAt: new Date,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'File upload failed' });
    }
};

export const show = async (
    request: Request<{ id: string }>,
    response: Response<IMediaFileResponse | IMessageResponse>
) => {
    try {
        const file = await Media.findById(request.params.id);

        if (! file) {
            return response.status(404).json({ message: 'File not found' });
        }

        response.status(200).json({
            id: file._id,
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
            createdAt: file.createdAt,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Failed to retrieve file' });
    }
};

export const destroy = async (
    request: Request<{ id: string }>,
    response: Response<IMessageResponse>
) => {
    try {
        const file = await Media.findByIdAndDelete(request.params.id);

        if (!file) {
            return response.status(404).json({ message: 'File not found' });
        }

        return response.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Failed to delete file' });
    }
};
