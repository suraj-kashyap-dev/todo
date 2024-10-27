import { IMember } from '@/types/member.types';
import { Model, Schema, model, Document } from 'mongoose';

export interface IMemberDocument extends IMember, Document {}

interface IMemberModel extends Model<IMemberDocument> {
    findByUserId(userId: string): Promise<IMemberDocument | null>;
    findByWorkspaceId(workspaceId: string): Promise<IMemberDocument | null>;
}

const memberSchema = new Schema<IMemberDocument>({
    userId: {
        type: String,
        required: true,
    },
    workspaceId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'member', 'guest'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

memberSchema.statics.findByUserId = function (userId: string) {
    return this.findOne({ userId });
};

memberSchema.statics.findByWorkspaceId = function (workspaceId: string) {
    return this.findOne({ workspaceId });
};

const Member = model<IMemberDocument, IMemberModel>('Member', memberSchema);

export default Member;
