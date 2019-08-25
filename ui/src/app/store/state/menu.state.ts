import { IMenu } from 'src/app/shared/components/menu/menu.model';

export interface IMenuState {
    menu: IMenu;
}

export const initialMenuState: IMenuState = {
    menu: { isOpen: false }
};