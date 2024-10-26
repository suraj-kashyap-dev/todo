import { IWorkspace } from "../types/workspace.types";
import mongoose, { Schema, Document } from "mongoose";

export interface IWorkspaceDocument extends IWorkspace, Document {
}

const WorkspaceSchema = new Schema<IWorkspaceDocument>({
    name: { type: String, required: true },
    userId: { type: String, required: true },
}, {
    timestamps: true,
});

export default mongoose.model<IWorkspaceDocument>("Workspace", WorkspaceSchema);