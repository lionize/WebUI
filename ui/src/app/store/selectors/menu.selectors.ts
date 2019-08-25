import { createSelector } from '@ngrx/store';

import { IAppState } from 'src/app/store/state/app.state';
import { IMenuState } from 'src/app/store/state/menu.state';

const menuState = (state: IAppState) => state.menu;

export const selectMenu = createSelector(
  menuState,
  (state: IMenuState) => state.menu
);