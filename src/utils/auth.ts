export const validateToken = async (token: string): Promise<User> => {
    const response = await fetch('/api/auth/validate', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Invalid token');
    }

    return response.json();
};