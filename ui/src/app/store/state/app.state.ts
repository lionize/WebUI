import { RouterReducerState } from '@ngrx/router-store';

import { IMenuState, initialMenuState } from './menu.state';
import { IMainState, initialMainState } from './main.state';

export interface IAppState {
    router?: RouterReducerState;
    menu: IMenuState;
    main: IMainState;
    //other states
}

export const initialAppState: IAppState = {
    menu: initialMenuState,
    main: initialMainState
};

export function getInitialState(): IAppState {
    return initialAppState;
}