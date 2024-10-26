import { Request, Response } from "express";
import Workspace from "../models/workspace.model";
import { IWorkspace, IWorkspaceResponse } from "../types/workspace.types";

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
        });

        const savedWorkspace = await workspace.save();
        
        return response.status(201).json({
            id: savedWorkspace._id,
            name: savedWorkspace.name,
            image: savedWorkspace.image,
            userId: savedWorkspace.userId,
        });
    } catch (errors) {
        return response.status(500).json({ message: "Failed to create workspace", errors });
    }
};

/**
 * Get all workspaces.
 */
export const index = async (req: Request, res: Response): Promise<Response> => {
    try {
        const workspaces = await Workspace.find();
        
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
 * Update a workspace by ID.
 */
export const update = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedWorkspace = await Workspace.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!updatedWorkspace) {
            return res.status(404).json({ message: "Workspace not found" });
        }

        return res.status(200).json({
            id: updatedWorkspace._id,
            name: updatedWorkspace.name,
            userId: updatedWorkspace.userId,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update workspace", error });
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
