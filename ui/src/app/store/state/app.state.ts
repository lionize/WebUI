import { RouterReducerState } from '@ngrx/router-store';

import { IMenuState, initialMenuState } from './menu.state';

export interface IAppState {
  router?: RouterReducerState;
  menu: IMenuState;
  //other states
}

export const initialAppState: IAppState = {
    menu: initialMenuState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}