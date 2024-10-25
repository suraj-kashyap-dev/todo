export interface ITag {
    title: string,
    status: boolean,
    createdAt: Date;
}

export interface ITagInput {
    title: string,
    status: boolean,
}

export interface ITagResponse {
    title: string,
    status: boolean,
    createdAt: Date,
    error?: Object,
}