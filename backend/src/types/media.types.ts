import { Types } from "mongoose";

export interface IMedia {
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
  createdAt: Date;
}

export interface IMediaInput {
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
  createdAt: Date;
}

export interface IMediaFileResponse {
  id: Types.ObjectId,
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
  createdAt: Date;
}

export interface UploadedFile {
  id: string;
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
  createdAt: Date;
}

export interface IMessageResponse {
  message: string;
}

