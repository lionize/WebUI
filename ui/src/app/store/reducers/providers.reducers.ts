import { ProvidersActions, PROVIDERS_ACTIONS } from '../actions/providers.actions';
import { initialProvidersState, IProvidersState } from './../state/providers.state';

export const providerReducers = (state = initialProvidersState, action: ProvidersActions): IProvidersState => {

  switch (action.type) {

    case PROVIDERS_ACTIONS.GET_ALL_PROVIDERS_SUCCESS: {
      return {
        ...state,
        providers: action.payload
      };
    }

    default:
      return state;
  }
};