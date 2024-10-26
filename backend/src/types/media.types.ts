export interface IMedia {
  _id: string;
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
  createdAt: Date;
  userId: string;
}

export interface IMediaInput {
  filename: string;
  originalname: string;
  path: string;
  size: number;
  mimetype: string;
  createdAt: Date;
  userId: string;
}

export interface IMediaFileResponse {
  id: string;
  message: string,
  file: {
    filename: string;
    originalname: string;
    path: string;
    size: number;
    mimetype: string;
    createdAt: Date;
    userId: string;
  }
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

