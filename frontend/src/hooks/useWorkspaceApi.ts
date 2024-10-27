import { useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { API_WORKSPACE } from '../config/constant';
import { Workspace } from '../types/workspace.types';

interface WorkspaceApiState {
    loading: boolean;
    error: string | null;
    workspace: Workspace[] | null;
    currentWorkspace: Workspace | null; // State to hold the current workspace
}

export const useWorkspaceApi = () => {
    const [state, setState] = useState<WorkspaceApiState>({
        loading: false,
        error: null,
        workspace: null,
        currentWorkspace: null, // Initialize as null
    });

    const handleError = (error: unknown) => {
        const axiosError = error as AxiosError<{ message: string }>;
        return axiosError.response?.data?.message || 'An error occurred';
    };

    const getWorkspace = async (): Promise<void> => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            const response = await httpClient.get<Workspace[]>(API_WORKSPACE);

            setState((prev) => ({
                ...prev,
                workspace: response.data,
            }));
        } catch (error) {
            const errorMessage = handleError(error);
            setState((prev) => ({ ...prev, error: errorMessage }));
            throw error;
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const getWorkspaceById = async (id: string): Promise<Workspace | null> => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            const response = await httpClient.get<Workspace>(`${API_WORKSPACE}/${id}`);

            setState((prev) => ({
                ...prev,
                currentWorkspace: response.data,
            }));

            return response.data; // Return the fetched workspace
        } catch (error) {
            const errorMessage = handleError(error);
            setState((prev) => ({ ...prev, error: errorMessage }));
            throw error;
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const storeWorkspace = async (values: {
        name: string,
        file: File | null,
    }): Promise<Workspace | null> => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            const response = await httpClient.post<Workspace>(API_WORKSPACE, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Add the newly created workspace to the state
            setState((prev) => ({
                ...prev,
                workspace: response.data ? [response.data, ...(prev.workspace || [])] : prev.workspace,
            }));

            // Return the newly created workspace
            return response.data; 
        } catch (error) {
            const errorMessage = handleError(error);
            setState((prev) => ({ ...prev, error: errorMessage }));
            throw error;
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateWorkspace = async (id: string, values: {
        name: string;
        file?: File | null; // The image file is optional
    }): Promise<Workspace | null> => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            const response = await httpClient.put<Workspace>(`${API_WORKSPACE}/${id}`, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Update the workspace in the state
            setState((prev) => {
                const updatedWorkspace = response.data;
                if (!prev.workspace) return { ...prev, workspace: [updatedWorkspace] };

                const updatedWorkspaces = prev.workspace.map((ws) =>
                    ws.id === updatedWorkspace.id ? updatedWorkspace : ws
                );

                return {
                    ...prev,
                    workspace: updatedWorkspaces,
                };
            });

            // Return the updated workspace
            return response.data; 
        } catch (error) {
            const errorMessage = handleError(error);
            setState((prev) => ({ ...prev, error: errorMessage }));
            throw error;
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    const destroyWorkspace = async (id: string): Promise<void> => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            await httpClient.delete(`${API_WORKSPACE}/${id}`);

            // Update the state to remove the destroyed workspace
            setState((prev) => ({
                ...prev,
                workspace: prev.workspace ? prev.workspace.filter(ws => ws.id !== id) : null,
                currentWorkspace: prev.currentWorkspace?.id === id ? null : prev.currentWorkspace, // Clear current workspace if it was deleted
            }));
        } catch (error) {
            const errorMessage = handleError(error);
            setState((prev) => ({ ...prev, error: errorMessage }));
            throw error;
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return {
        ...state,
        getWorkspace,
        getWorkspaceById,
        storeWorkspace,
        updateWorkspace,
        destroyWorkspace,
    };
};
