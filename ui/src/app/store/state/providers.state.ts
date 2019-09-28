
import { ProviderDataTypes } from 'src/app/pages/admin/providers/providers.models';

export interface IProvidersState {
    providers: ProviderDataTypes;
}

export const initialProvidersState: IProvidersState = {
    providers: null
};