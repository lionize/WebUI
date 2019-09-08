import { Action } from '@ngrx/store';
import { TMenu } from 'src/app/shared/components/menu/menu.model';

export enum MENU_ACTIONS {
    OPEN_MENU = '[MENU] Open Menu'
}

export class ToggleMenu implements Action {
    public readonly type = MENU_ACTIONS.OPEN_MENU;
    constructor(public payload: TMenu) { }
}

export type MenuActions = ToggleMenu;