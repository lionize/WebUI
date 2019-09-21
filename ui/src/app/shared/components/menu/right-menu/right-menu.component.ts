import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectRightMenu } from 'src/app/store/selectors/menu.selectors';
import { RightMenu } from 'src/app/shared/components/menu/menu.model';
import { rightMenuToggleAnimation } from '../menu.animations';
import { ToggleRightMenu } from 'src/app/store/actions/menu.actions';

@Component({
    selector: 'li-right-menu',
    templateUrl: './right-menu.component.html',
    styleUrls: ['./right-menu.component.scss'],
    animations: [rightMenuToggleAnimation]
})

export class RightMenuComponent implements OnInit {
    menu$ = this.store.pipe(select(selectRightMenu));
    rightMenu: RightMenu;

    constructor(
        private store: Store<IAppState>
    ) {

    }

    ngOnInit() {
        this.menu$.subscribe((menu: RightMenu) => {
            this.rightMenu = menu;
        });
    }

    closeRightMenu(): void {
        this.store.dispatch(new ToggleRightMenu({ isOpen: false }));
    }

}
