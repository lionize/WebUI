import { MainActions, MAIN_ACTIONS } from 'src/app/store/actions/main.actions';
import { initialMainState, IMainState } from '../state/main.state';

export function mainReducers(state = initialMainState, action: MainActions): IMainState {
    switch (action.type) {
        case MAIN_ACTIONS.APP_LOADING: {
            return {
                ...state,
                main: action.payload
            };
        }

        default:
            return state;
    }
};