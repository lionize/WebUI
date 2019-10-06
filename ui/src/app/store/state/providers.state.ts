
import { PROVIDER_DATA_TYPES } from 'src/app/pages/admin/providers/providers.models';

export interface IProvidersState {
    providers: PROVIDER_DATA_TYPES;
}

export const initialProvidersState: IProvidersState = {
    providers: null
};