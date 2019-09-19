import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectLeftMenu } from 'src/app/store/selectors/menu.selectors';
import { LeftMenu } from 'src/app/shared/components/menu/menu.model';
import { leftMenuToggleAnimation } from '../menu.animations';

@Component({
    selector: 'li-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss'],
    animations: [leftMenuToggleAnimation]
})

export class LeftMenuComponent implements OnInit {
    menu$ = this.store.pipe(select(selectLeftMenu));
    leftMenu: LeftMenu;

    constructor(
        private store: Store<IAppState>
    ) {

    }

    ngOnInit() {
        this.menu$.subscribe((menu: LeftMenu) => {
            this.leftMenu = menu;
        });
    }

}
