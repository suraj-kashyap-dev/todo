import { IWorkspace } from "../types/workspace.types";
import mongoose, { Schema, Document } from "mongoose";

export interface IWorkspaceDocument extends IWorkspace, Document {
}

const WorkspaceSchema = new Schema<IWorkspaceDocument>({
    name: { type: String, required: true },
    image: { type: String, required: false },
    userId: { type: String, required: true },
    createdAt: {
        type: Date,
        default: new Date,
    }
});

export default mongoose.model<IWorkspaceDocument>("Workspace", WorkspaceSchema);