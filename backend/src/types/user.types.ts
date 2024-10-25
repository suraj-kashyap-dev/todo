export interface IUser {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: String,
    phoneNumber: String,
    address: String,
    company: String,
    bio: String,
    createdAt: Date;
}

export interface IUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: String,
    phoneNumber: String,
    address: String,
    company: String,
    bio: String,
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
