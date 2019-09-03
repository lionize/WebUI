import { Action } from '@ngrx/store';

export enum APP_ACTIONS {
    RESET = '[APP] Reset'
}

export class ResetApp implements Action {
    public readonly type = APP_ACTIONS.RESET;
}

export type AppActions = ResetApp;