export interface IUserLogin {
    username: string;
    password: string;
}
export interface IUserRegister {
    username: string;
    password: string;
}
export interface IUser {
    username: string;
    accessToken: string;
    refreshToken: string;
}