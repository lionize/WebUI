import { LeftMenu, RightMenu } from 'src/app/shared/ui-models/menu.models';

export interface IMenuState {
    leftMenu: LeftMenu;
    rightMenu: RightMenu;
}

export const initialMenuState: IMenuState = {
    leftMenu: {
        isOpen: true,
    },
    rightMenu: {
        isOpen: false,
    }
};