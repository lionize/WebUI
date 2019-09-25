import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProviderDataTypes } from 'src/app/pages/admin/providers/providers.models';
import { ProvidersService } from 'src/app/pages/admin/providers/providers.service';
import { PROVIDERS_ACTIONS, GetAllProviders, GetAllProvidersSuccess } from '../actions/providers.actions';

@Injectable()
export class ConfigEffects {
    @Effect()
    getProviders$ = this.actions$.pipe(
        ofType<GetAllProviders>(PROVIDERS_ACTIONS.GET_ALL_PROVIDERS),
        switchMap(() => this.providersService.getAllProviders()),
        switchMap((providers: ProviderDataTypes) => {
            return of(new GetAllProvidersSuccess(providers));
        })
    );

    constructor(
        private providersService: ProvidersService,
        private actions$: Actions) { }
}