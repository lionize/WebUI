//TODO use type instead of interface for simple types
//TODO front-end models, place in separate file
export type UISigninUser = {
    username: string;
    password: string;
}

export type UISignupUser = {
    username: string;
    password: string;
}

//TODO back-end models, place in separate file
export type SignUpUser = {
    isError: boolean;
    isSuccess: boolean;
    errorMessage: string;
}

export type SigInUser = {
    username?: string;
    accessToken?: string;
    refreshToken: string;
    identityToken?: string;
    tokenType?: string;
    isError?: boolean;
    errorMessage?: string;
}