import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { ToggleLeftMenu } from 'src/app/store/actions/menu.actions';

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
        this.store.dispatch(new ToggleLeftMenu({ isOpen: false }));
    }
}   
