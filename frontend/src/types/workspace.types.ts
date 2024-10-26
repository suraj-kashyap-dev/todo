export interface Workspace {
    id: string;
    name: string,
    image: string,
    createAt: Date,
}

export interface WorkspaceUserInput {
    name: string,
    image: File | null,
}
  