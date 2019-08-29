export enum MATRIX {
    DO_FIRST = 'DO_FIRST',
    SCHEDULE = 'SCHEDULE',
    DELEGATE = 'DELEGATE',
    DONT_DO = 'DONT_DO',
}

export enum API_URLS {
    SIGN_UP = 'Accounts/SignUp',
    SIGN_IN = 'Accounts/SignIn'
}

//TODO place in separate file
export interface IMatrixDetail {
    type: MATRIX;
    title: string;
    subTitle: string;
    color: string;
}

export const matrixDetailed: IMatrixDetail[] = [
    {
        type: MATRIX.DO_FIRST,
        title: 'Do first',
        subTitle: 'Urgent & important',
        //TODO use enum
        color: '#99cc11'
    },
    {
        type: MATRIX.SCHEDULE,
        title: 'Schedule',
        subTitle: 'Less urgent, but important',
        //TODO use enum
        color: '#4488ee'
    },
    {
        type: MATRIX.DELEGATE,
        title: 'Delegate',
        subTitle: 'Urgent, but less important',
        //TODO use enum
        color: '#ffaa22'
    },
    {
        type: MATRIX.DONT_DO,
        title: 'Don\'t\ do',
        subTitle: 'Neither urgent or important',
        //TODO use enum
        color: '#cc1111'
    }
]