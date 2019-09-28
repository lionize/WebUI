import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IAppState } from 'src/app/store/state/app.state';
import { ToggleLeftMenu, ToggleRightMenu } from 'src/app/store/actions/menu.actions';
import { selectMain } from 'src/app/store/selectors/main.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    isLoading$ = this.store.pipe(select(selectMain));
    isLoading = new BehaviorSubject(false);

    constructor(
        private router: Router,
        private store: Store<IAppState>,
        private cdRef: ChangeDetectorRef
    ) {
        router.events.subscribe((event: Event) => {

            if (event instanceof NavigationEnd) {
                this.handleRouteChanges();
                // TODO also close all notification messages
            }
            
        });


    }

    ngOnInit() {
        this.subscribeToMainActions();
    }

    private handleRouteChanges() {
        // FIXME affects on reducer, sets menus isOpen: false
        // this.store.dispatch(new ToggleLeftMenu({ isOpen: false }));
        this.store.dispatch(new ToggleRightMenu({ isOpen: false }));
    }

    private subscribeToMainActions(): void {
        this.isLoading$.subscribe((response) => {
            this.isLoading.next(response.isAppLoading);
            this.cdRef.detectChanges();
        });
    }
}
