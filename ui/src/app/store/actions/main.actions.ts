import { Action } from '@ngrx/store';
import { MainState } from '../state/main.state';

export enum MAIN_ACTIONS {
    APP_LOADING = '[APP] App Loading'
}

export class AppLoading implements Action {
    public readonly type = MAIN_ACTIONS.APP_LOADING;
    constructor(public payload: MainState) { }
}

export type MainActions = AppLoading;