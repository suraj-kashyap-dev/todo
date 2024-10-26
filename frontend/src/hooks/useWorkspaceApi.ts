import { useState } from 'react';
import { AxiosError } from 'axios';
import { httpClient } from '../utils/httpClient';
import { API_WORKSPACE } from '../config/constant';
import { Workspace } from '../types/workspace.types';

interface WorkspaceApiState {
    loading: boolean;
    error: string | null;
    workspace: Workspace[] | null;
}

export const useWorkspaceApi = () => {
    const [state, setState] = useState<WorkspaceApiState>({
        loading: false,
        error: null,
        workspace: null,
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

    const storeWorspace = async (values: {
        name: string,
        file: File | null,
    }): Promise<void> => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            const response = await httpClient.post<Workspace>(API_WORKSPACE, values, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setState((prev) => ({
                ...prev,
                workspace: response.data ? [response.data, ...(prev.workspace || [])] : prev.workspace,
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
        storeWorspace,
    };
};
