export type MainState = {
    isAppLoading: boolean;
}

export interface IMainState {
    main: MainState;
}

export const initialMainState: IMainState = {
    main: {
        isAppLoading: false
    }
};