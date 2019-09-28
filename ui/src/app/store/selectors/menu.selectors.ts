import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { IMenuState } from 'src/app/store/state/menu.state';

const menuState = (state: IAppState) => state.menu;

export const selectLeftMenu = createSelector(
    menuState,
    (state: IMenuState) => state.leftMenu
);

export const selectRightMenu = createSelector(
    menuState,
    (state: IMenuState) => state.rightMenu
);