import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { ToggleMenu } from 'src/app/store/actions/menu.actions';
import { MENU_DIRECTIONS } from 'src/app/shared/components/menu/menu.model';
import { ApiService } from './shared/services/api.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    // isAppLoading$ = this.store.pipe(select(selectMenu));

    constructor(
        private router: Router,
        private apiService: ApiService,
        private store: Store<IAppState>,
    ) {
        router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                // TODO cancel all requests here
                // this.apiService.cancelRequest();
            }
            if (event instanceof NavigationEnd) {
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
