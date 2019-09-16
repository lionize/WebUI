import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { IAppState } from 'src/app/store/state/app.state';
import { menuReducers } from './menu.reducers';
import { APP_ACTIONS } from 'src/app/store/actions/app.actions';
import { mainReducers } from './main.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
    menu: menuReducers,
    router: routerReducer,
    main: mainReducers
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