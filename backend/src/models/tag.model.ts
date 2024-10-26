import { Model, Schema, model, Document, ObjectId } from 'mongoose';
import { ITag } from '../types/tag.types';

export interface ITagDocument extends ITag, Document {
}

interface ITagModel extends Model<ITagDocument> {
    findByTitle(email: string): Promise<ITagDocument | null>;
}

const tagsSchema = new Schema<ITagDocument>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

tagsSchema.statics.findById = function (id: string) {
    return this.findOne({ _id: id });
};

tagsSchema.statics.findByTitle = function (title: string) {
    return this.findOne({ title });
};

const Tag = model<ITagDocument, ITagModel>('Tags', tagsSchema);

export default Tag;