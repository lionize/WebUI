import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { ToggleMenu } from 'src/app/store/actions/menu.actions';
import { MENU_DIRECTIONS } from 'src/app/shared/components/menu/menu.model';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

    constructor(
        private store: Store<IAppState>,
    ) {

    }

    ngOnInit() {

    }

    closeSidenav() {
        debugger
        this.store.dispatch(new ToggleMenu({ isOpen: false, direction: MENU_DIRECTIONS.LEFT }));
    }
}   
