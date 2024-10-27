export interface Workspace {
  id: string;
  name: string;
  image: string;
  inviteCode: string,
  createdAt: string;
}

export interface WorkspaceUserInput {
  name: string;
  image: File | null;
}
