export interface IUser {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
}

export interface IUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface ILoginInput {
    email: string;
    password: string;
}

export interface IAuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}
