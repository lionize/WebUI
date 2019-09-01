export interface IMenu {
    isOpen: boolean;
    direction: string;
}

export enum MENU_DIRECTIONS {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}