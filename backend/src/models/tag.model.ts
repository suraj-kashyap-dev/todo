import { Model, Schema, model } from 'mongoose';
import { ITag } from '../types/tag.types';

interface ITagModel extends Model<ITag> {
    findByTitle(email: string): Promise<ITag | null>;
}

const tagsSchema = new Schema<ITag>({
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

const Tag = model<ITag, ITagModel>('Tags', tagsSchema);

export default Tag;