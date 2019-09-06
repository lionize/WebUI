import { TMenu } from 'src/app/shared/components/menu/menu.model';

export interface IMenuState {
    menu: TMenu;
}

export const initialMenuState: IMenuState = {
    menu: {
        isOpen: false,
        direction: 'left'
    }
};