export enum ProviderTypes {
    HABITICA = 'Habitica',
    MICROSOFT_TO_DO = 'Microsoft Todo',
    GOOGLE_TASKS = 'Google Tasks'
}

export type ProviderDataTypes = {
    habitica: any[];
    microsoft: any[];
    google: any[];
}