/**
 * Enum for member roles.
 */
export enum Role {
    ADMIN = 'admin',
    MEMBER = 'member',
    GUEST = 'guest',
}

/**
 * Model with Role.
 */
export interface IMember {
    _id: string;
    userId: string;
    workspaceId: string;
    role: Role; // New role field
    createdAt: Date;
}

/**
 * User Input with Role.
 */
export interface IMemberInput {
    userId: string;
    workspaceId: string;
    role: Role; // New role field
}

/**
 * Api Response with Role.
 */
export interface IMemberResponse {
    id: string;
    userId: string;
    workspaceId: string;
    role: Role; // New role field
}
