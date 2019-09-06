export enum MENU_DIRECTIONS {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export type TMenu = {
    isOpen: boolean;
    direction: string;
}