import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { IAppState, initialAppState } from 'src/app/store/state/app.state';
import { menuReducers } from './menu.reducers';
import { AppActions, APP_ACTIONS } from 'src/app/store/actions/app.actions';

export const appReducers: ActionReducerMap<IAppState, any> = {
    menu: menuReducers,
    router: routerReducer,
    //other reducers
};

export function clearState(reducer) {
    return function (state, action) {

        if (action.type === APP_ACTIONS.RESET) {
            state = undefined;
        }

        return reducer(state, action);
    };
}