import { createSelector } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { IMainState } from 'src/app/store/state/main.state';

const mainState = (state: IAppState) => state.main;

export const selectMain = createSelector(
    mainState,
    (state: IMainState) => state.main
);