export enum PROVIDER_TYPES {
    HABITICA = 'Habitica',
    MICROSOFT_TO_DO = 'Microsoft Todo',
    GOOGLE_TASKS = 'Google Tasks'
}

export type PROVIDER_DATA_TYPES = {
    habitica: any[];
    microsoft: any[];
    google: any[];
}