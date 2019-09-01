import { Action } from '@ngrx/store';

import { IMenu } from 'src/app/shared/components/menu/menu.model';

export enum MENU_ACTIONS {
    OPEN_MENU = '[MENU] Open Menu'
}

export class OpenMenu implements Action {
    public readonly type = MENU_ACTIONS.OPEN_MENU;
    constructor(public payload: IMenu) { }
}

export type MenuActions = OpenMenu;