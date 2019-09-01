import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from 'src/app/store/state/app.state';
import { menuReducers } from './menu.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
    menu: menuReducers,
    router: routerReducer,
    //other reducers
};