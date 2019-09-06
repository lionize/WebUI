//TODO use type instead of interface for simple types
//TODO front-end models, place in separate file
export type TClientUserLogin = {
    username: string;
    password: string;
}

export type TClientUserRegister = {
    username: string;
    password: string;
}

//TODO back-end models, place in separate file
export type TSignUpUser = {
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
}

export type TSigInUser = {
    username: string;
    accessToken: string;
    identityToken?: string;
    tokenType?: string;
    refreshToken: string;
    isError?: boolean;
    errorMessage?: string;
}