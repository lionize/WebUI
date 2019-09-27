import { RouterReducerState } from '@ngrx/router-store';

import { IMenuState, initialMenuState } from './menu.state';
import { IMainState, initialMainState } from './main.state';
import { IProvidersState, initialProvidersState } from './providers.state';

export interface IAppState {
    router?: RouterReducerState;
    menu: IMenuState;
    main: IMainState;
    // providers: IProvidersState
    //other states
}

export const initialAppState: IAppState = {
    menu: initialMenuState,
    main: initialMainState,
    // providers: initialProvidersState
};

export function getInitialState(): IAppState {
    return initialAppState;
}