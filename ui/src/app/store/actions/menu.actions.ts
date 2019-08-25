import { Action } from '@ngrx/store';

import { IMenu } from 'src/app/shared/components/menu/menu.model';

export enum EMenuActions {
  OPEN_MENU = '[MENU] Open Menu'
}

export class OpenMenu implements Action {
  public readonly type = EMenuActions.OPEN_MENU;
  constructor(public payload: IMenu) {}
}

export type MenuActions = OpenMenu;