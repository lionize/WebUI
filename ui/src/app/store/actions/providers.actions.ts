import { Action } from '@ngrx/store';
import { PROVIDER_DATA_TYPES } from 'src/app/shared/ui-models/providers.models';

export enum PROVIDERS_ACTIONS {
    GET_ALL_PROVIDERS = '[PROVIDERS] Get All Providers',
    GET_ALL_PROVIDERS_SUCCESS = '[PROVIDERS] Get All Providers Success'
}

export class GetAllProviders implements Action {
    public readonly type = PROVIDERS_ACTIONS.GET_ALL_PROVIDERS;
}

export class GetAllProvidersSuccess implements Action {
    public readonly type = PROVIDERS_ACTIONS.GET_ALL_PROVIDERS_SUCCESS;
    constructor(public payload: PROVIDER_DATA_TYPES) { }
}

export type ProvidersActions = GetAllProviders | GetAllProvidersSuccess;