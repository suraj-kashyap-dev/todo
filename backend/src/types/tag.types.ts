/**
 * Model.
 */
export interface ITag {
    _id: string;
    title: string;
    status: boolean;
    createdAt: Date;
}

/**
 * User Input.
 */
export interface ITagInput {
    title: string,
    status: boolean,
}

/**
 * Api Response.
 */
export interface ITagResponse {
    id: string,
    title: string,
    status: boolean,
    createdAt: Date,
    error?: Object,
}