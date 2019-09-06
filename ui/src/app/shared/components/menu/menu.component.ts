import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectMenu } from 'src/app/store/selectors/menu.selectors';
import { TMenu, MENU_DIRECTIONS } from 'src/app/shared/components/menu/menu.model';
import { leftOpenCloseAnimation, rightOpenCloseAnimation } from './menu.animations';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    animations: [leftOpenCloseAnimation, rightOpenCloseAnimation]
})

export class MenuComponent implements OnInit {
    menu$ = this.store.pipe(select(selectMenu));
    MENU_DIRECTIONS: typeof MENU_DIRECTIONS = MENU_DIRECTIONS;
    leftMenu: TMenu;
    rightMenu: TMenu;

    constructor(
        private store: Store<IAppState>,
    ) {

    }

    ngOnInit() {
        this.menu$.subscribe((menu: TMenu) => {
            if (menu.direction === MENU_DIRECTIONS.LEFT) {
                this.leftMenu = menu;
            }
            if (menu.direction === MENU_DIRECTIONS.RIGHT) {
                this.rightMenu = menu;
            }
        });
    }

}
