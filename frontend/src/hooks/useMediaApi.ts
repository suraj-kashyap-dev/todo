import { useState } from "react";
import { MediaFile } from "../types/media.types";
import { AxiosError } from "axios";
import { API_MEDIA_INDEX } from "../config/constant";
import { httpClient } from "../utils/httpClient";

interface MediaApiState {
    loading: boolean;
    error: string | null;
    media: MediaFile[] | null;
}

export const useMediaApi = () => {
    const [state, setState] = useState<MediaApiState>({
        loading: false,
        error: null,
        media: null,
    });

    const handleError = (error: unknown) => {
        const axiosError = error as AxiosError<{ message: string }>;
        return axiosError.response?.data?.message || 'An error occurred';
    };

    const getMedia = async (): Promise<void> => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));

            const response = await httpClient.get<MediaFile[]>(API_MEDIA_INDEX);

            setState((prev) => ({
                ...prev,
                media: response.data,
            }));
        } catch (error) {
            const errorMessage = handleError(error);
            setState((prev) => ({ ...prev, error: errorMessage }));
            throw error;
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    }

    return {
        ...state,
        getMedia,
    }
}
