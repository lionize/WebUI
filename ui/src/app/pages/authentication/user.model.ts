//TODO use type instead of interface for simple types
//TODO front-end models, place in separate file
import { Lionize as Task } from 'src/app/shared/models/tasks/Lionize';
import { Lionize as Identity } from 'src/app/shared/models/identity/Lionize';
export type SignInRequest = Task.TaskManagement.ApiModels.V1.SignInRequest;
export type SignInResponse = Task.TaskManagement.ApiModels.V1.SignInResponse;
export type SignOutRequest = Task.TaskManagement.ApiModels.V1.SignOutRequest;
export type SignOutResponse = Task.TaskManagement.ApiModels.V1.SignOutResponse;
export type RefreshTokenRequest = Task.TaskManagement.ApiModels.V1.RefreshTokenRequest;
export type RefreshTokenResponse = Task.TaskManagement.ApiModels.V1.RefreshTokenResponse;
export type SignUpRequest = Identity.IdentityManagementService.ApiModels.SignUpRequest;
export type SignUpResponse = Identity.IdentityManagementService.ApiModels.SignUpResponse;


// TODO remove
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