import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { PROVIDER_DATA_TYPES } from 'src/app/shared/ui-models/providers.models';
import { ProvidersService } from 'src/app/pages/admin/providers/providers.service';
import { PROVIDERS_ACTIONS, GetAllProviders, GetAllProvidersSuccess } from '../actions/providers.actions';

@Injectable()
export class ProvidersEffects {
    @Effect()
    getProviders$ = this.actions$.pipe(
        ofType<GetAllProviders>(PROVIDERS_ACTIONS.GET_ALL_PROVIDERS),
        switchMap(() => this.providersService.getAllProviders()),
        switchMap((providers: PROVIDER_DATA_TYPES) =>  of(new GetAllProvidersSuccess(providers))),
        map((action) => action.payload),
        // map((response) => {
        //     return {
        //         habitica: response.payload[0]
        //     }
        // })
    );

    constructor(
        private providersService: ProvidersService,
        private actions$: Actions) { }
}