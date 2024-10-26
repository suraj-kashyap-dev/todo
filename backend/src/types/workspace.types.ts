/**
 * Workspace model.
 */
export interface IWorkspace {
    _id: string,
    name: string,
    userId: string,
}

/**
 * User Input.
 */
export interface IWorkspaceInput {
 name: string, 
}

/**
 * Workspace Response.
 */
export interface IWorkspaceResponse {
    id: string,
    name: string,
    userId: string,
}