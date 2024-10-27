/**
 * Generate a unique invite code.
 */
export const generateInviteCode = (): string => {
    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);

        code += characters[randomIndex];
    }

    const timestamp = Date.now().toString(36);

    return `${code}-${timestamp}`;
};
