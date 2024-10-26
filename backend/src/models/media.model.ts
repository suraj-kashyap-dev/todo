import { Model, Schema, model } from 'mongoose';
import { IMedia } from '../types/media.types';

interface IMediaModel extends Model<IMedia> {
    findByTitle(title: string): Promise<IMedia | null>;
}

const mediaSchema = new Schema<IMedia>({
    filename: {
        type: String,
        required: true,
    },
    originalname: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        required: true,
    },
});

mediaSchema.statics.findByTitle = function (title: string) {
    return this.findOne({ title });
};

mediaSchema.statics.findById = function (id: string) {
    return this.findOne({ _id: id });
};

const Media = model<IMedia, IMediaModel>('Media', mediaSchema);

export default Media;
