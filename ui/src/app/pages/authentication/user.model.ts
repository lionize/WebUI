//TODO use type instead of interface for simple types
//TODO front-end models, place in separate file
export type IClientUserLogin = {
    username: string;
    password: string;
}

export type IClientUserRegister = {
    username: string;
    password: string;
}

//TODO back-end models, place in separate file
export type ISignUpUser = {
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
}

export type ISigInUser = {
    username: string;
    accessToken: string;
    identityToken?: string;
    tokenType?: string;
    refreshToken: string;
    isError?: boolean;
    errorMessage?: string;
}