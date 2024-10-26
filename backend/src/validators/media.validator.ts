import { z } from 'zod';

export const MediaSchema = z.object({
  _id: z.string(),
  filename: z.string().min(1, "Filename is required"),
  originalname: z.string().min(1, "Original name is required"),
  path: z.string().url("Path must be a valid URL"),
  size: z.number().positive("Size must be a positive number"),
  mimetype: z.string().min(1, "MIME type is required"),
  createdAt: z.date(),
  userId: z.string().min(1, "User ID is required"),
});

export const MediaInputSchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  originalname: z.string().min(1, "Original name is required"),
  path: z.string().url("Path must be a valid URL"),
  size: z.number().positive("Size must be a positive number"),
  mimetype: z.string().min(1, "MIME type is required"),
  createdAt: z.date().optional(),
  userId: z.string().min(1, "User ID is required"),
});

export const MediaFileResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
  file: MediaSchema,
});

export const MessageResponseSchema = z.object({
  message: z.string(),
});

export const UploadedFileSchema = z.object({
  id: z.string(),
  filename: z.string().min(1, "Filename is required"),
  originalname: z.string().min(1, "Original name is required"),
  path: z.string().url("Path must be a valid URL"),
  size: z.number().positive("Size must be a positive number"),
  mimetype: z.string().min(1, "MIME type is required"),
  createdAt: z.date(),
});
