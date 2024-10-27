/**
 * Workspace model.
 */
export interface IWorkspace {
    _id: string,
    name: string,
    image: string,
    userId: string,
    inviteCode: string,
    createdAt: Date,
}

/**
 * User Input.
 */
export interface IWorkspaceInput {
 name: string,
 image: string
}

/**
 * Workspace Response.
 */
export interface IWorkspaceResponse {
    id: string,
    name: string,
    image: string | null
    userId: string,
}