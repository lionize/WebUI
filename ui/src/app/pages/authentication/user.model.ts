
//TODO front-end models, place in separate file
export interface IClientUserLogin {
    username: string;
    password: string;
}

export interface IClientUserRegister {
    username: string;
    password: string;
}

//TODO back-end models, place in separate file
export interface ISignUpUser {
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
}

export interface ISigInUser {
    username: string;
    accessToken: string;
    identityToken?: string;
    tokenType?: string;
    refreshToken: string;
    isError?: boolean;
    errorMessage?: string;
}