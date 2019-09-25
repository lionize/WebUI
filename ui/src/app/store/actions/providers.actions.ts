import { Action } from '@ngrx/store';
import { ProviderDataTypes } from 'src/app/pages/admin/providers/providers.models';

export enum PROVIDERS_ACTIONS {
    GET_ALL_PROVIDERS = '[PROVIDERS] Get All Providers',
    GET_ALL_PROVIDERS_SUCCESS = '[PROVIDERS] Get All Providers Success'
}

export class GetAllProviders implements Action {
    public readonly type = PROVIDERS_ACTIONS.GET_ALL_PROVIDERS;
}

export class GetAllProvidersSuccess implements Action {
    public readonly type = PROVIDERS_ACTIONS.GET_ALL_PROVIDERS_SUCCESS;
    constructor(public payload: ProviderDataTypes) { }
}

export type ProvidersActions = GetAllProviders | GetAllProvidersSuccess;