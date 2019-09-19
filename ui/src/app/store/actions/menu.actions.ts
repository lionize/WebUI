import { Action } from '@ngrx/store';
import { LeftMenu, RightMenu } from 'src/app/shared/components/menu/menu.model';

export enum MENU_ACTIONS {
    OPEN_LEFT_MENU = '[MENU] Open Left Menu',
    OPEN_RIGHT_MENU = '[MENU] Open Right Menu'
}

export class ToggleLeftMenu implements Action {
    public readonly type = MENU_ACTIONS.OPEN_LEFT_MENU;
    constructor(public payload: LeftMenu) { }
}

export class ToggleRightMenu implements Action {
    public readonly type = MENU_ACTIONS.OPEN_RIGHT_MENU;
    constructor(public payload: RightMenu) { }
}

export type MenuActions = ToggleLeftMenu | ToggleRightMenu;