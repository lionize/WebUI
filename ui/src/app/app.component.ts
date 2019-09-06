import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { ToggleMenu } from 'src/app/store/actions/menu.actions';
import { MENU_DIRECTIONS } from 'src/app/shared/components/menu/menu.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private store: Store<IAppState>,
    ) {
        router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                //TODO handle app loading indicator here
                this.handleRouteChanges();
            }
        });


    }

    ngOnInit() {
        
    }

    private handleRouteChanges() {
        this.store.dispatch(new ToggleMenu({ isOpen: false, direction: MENU_DIRECTIONS.LEFT }));
        this.store.dispatch(new ToggleMenu({ isOpen: false, direction: MENU_DIRECTIONS.RIGHT }));
    }
}
