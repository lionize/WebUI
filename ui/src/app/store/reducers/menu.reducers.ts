import { MenuActions, MENU_ACTIONS } from 'src/app/store/actions/menu.actions';
import { initialMenuState, IMenuState } from 'src/app/store/state/menu.state';

export function menuReducers(state = initialMenuState, action: MenuActions): IMenuState {
    switch (action.type) {
        case MENU_ACTIONS.OPEN_MENU: {
            return {
                ...state,
                menu: action.payload
            };
        }

        default:
            return state;
    }
};