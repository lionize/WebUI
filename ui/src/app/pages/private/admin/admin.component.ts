import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectMenu } from 'src/app/store/selectors/menu.selectors';
import { IMenu } from 'src/app/shared/components/menu/menu.model';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

    menu$ = this.store.pipe(select(selectMenu));
    isMenuOpen: boolean;

    constructor(
        private store: Store<IAppState>,
    ) {

    }

    ngOnInit() {
        this.menu$.subscribe((menu: IMenu) => {
            this.isMenuOpen = menu.isOpen;
        });
    }
}   
