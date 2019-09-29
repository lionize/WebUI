export enum MATRIX {
    DO_FIRST = 'Do first',
    SCHEDULE = 'Schedule',
    DELEGATE = 'Delegate',
    DONT_DO = 'Don\'t do'
}

export enum MATRIX_NUM {
    DO_FIRST = 1,
    SCHEDULE,
    DELEGATE,
    DONT_DO
}

export enum API_URLS {
    SIGN_UP = 'Accounts/SignUp',
    SIGN_IN = 'Accounts/SignIn',
    SIGN_OUT = 'Accounts/SignOut',
    REFRESH = 'Accounts/Refresh'
}

export enum HTTP_REQUEST_TYPES {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete'
}

// TODO place in separate file
export interface IMatrixDetail {
    type: MATRIX;
    title: string;
    subTitle: string;
    color: string;
}

export interface ITask {
    type: MATRIX_NUM;
    uuid: string;
    title: string;
    subTitle: string;
    color: string;
}

// export const matrixDetailed: IMatrixDetail[] = [
//     {
//         type: MATRIX.DO_FIRST,
//         title: 'Do first',
//         subTitle: 'Urgent & important',
//         //TODO use enum
//         color: '#99cc11'
//     },
//     {
//         type: MATRIX.SCHEDULE,
//         title: 'Schedule',
//         subTitle: 'Less urgent, but important',
//         //TODO use enum
//         color: '#4488ee'
//     },
//     {
//         type: MATRIX.DELEGATE,
//         title: 'Delegate',
//         subTitle: 'Urgent, but less important',
//         //TODO use enum
//         color: '#ffaa22'
//     },
//     {
//         type: MATRIX.DONT_DO,
//         title: 'Don\'t\ do',
//         subTitle: 'Neither urgent or important',
//         //TODO use enum
//         color: '#cc1111'
//     }
// ]