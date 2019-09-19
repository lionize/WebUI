import { LeftMenu, RightMenu } from 'src/app/shared/components/menu/menu.model';

export interface IMenuState {
    leftMenu: LeftMenu;
    rightMenu: RightMenu
}

export const initialMenuState: IMenuState = {
    leftMenu: {
        isOpen: false,
    },
    rightMenu: {
        isOpen: false,
    }
};