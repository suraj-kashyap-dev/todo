import { Request, Response } from "express";
import Workspace from "../models/workspace.model";
import { IWorkspace, IWorkspaceResponse } from "../types/workspace.types";
import Member from "../models/member.models";
import { generateInviteCode } from "../helpers/utils";

/**
 * Create a new workspace.
 */
export const store = async (
    request: Request<{}, {}, IWorkspace>,
    response: Response<IWorkspaceResponse | { message: string; errors?: any }>
): Promise<Response> => {
    try {
        const { name } = request.body;

        let exits = await Workspace.findOne({ name });

        if (exits) {
            return response.status(201).json({message: "Already exits workspace"});
        }

        const workspace = new Workspace({ 
            name, 
            image: request.file?.path,
            userId: request.userId,
            inviteCode: generateInviteCode(8),
        });

        const savedWorkspace = await workspace.save();

        /**
         * Save Member
         */
        new Member({
            userId: workspace.userId,
            workspaceId: workspace.id,
            role: "admin",
        }).save()
        
        return response.status(201).json({
            id: savedWorkspace._id,
            name: savedWorkspace.name,
            image: savedWorkspace.image,
            userId: savedWorkspace.userId,
        });
    } catch (errors) {
        console.log(errors);
        
        return response.status(500).json({ message: "Failed to create workspace", errors });
    }
};

/**
 * Get all workspaces.
 */
export const index = async (req: Request, res: Response): Promise<Response> => {
    try {
        const members = await Member.find({ userId: req.userId });

        const workspaceIds = members.map((member) => member.workspaceId);

        const workspaces = await Workspace.find({ _id: { $in: workspaceIds } });

        const formattedWorkspaces = workspaces.map((workspace) => ({
            id: workspace._id,
            name: workspace.name,
            userId: workspace.userId,
            image: workspace.image,
            createdAt: workspace.createdAt,
        }));

        return res.status(200).json(formattedWorkspaces);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch workspaces", error });
    }
};
/**
 * Get a single workspace by ID.
 */
export const show = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const workspace = await Workspace.findById(id);

        if (!workspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        return res.status(200).json({
            id: workspace._id,
            name: workspace.name,
            userId: workspace.userId,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch workspace", error });
    }
};

/**
 * Update a member by ID.
 */
export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { userId, workspaceId, role } = req.body;

        const updatedMember = await Member.findByIdAndUpdate(
            id,
            { userId, workspaceId, role },
            { new: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ message: "Member not found" });
        }

        return res.status(200).json({
            id: updatedMember._id,
            userId: updatedMember.userId,
            workspaceId: updatedMember.workspaceId,
            role: updatedMember.role,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update member", error });
    }
};

/**
 * Delete a workspace by ID.
 */
export const destroy = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const deletedWorkspace = await Workspace.findByIdAndDelete(id);

        if (!deletedWorkspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        return res.status(200).json({ message: "Workspace deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete workspace", error });
    }
};
