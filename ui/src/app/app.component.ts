import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { ToggleLeftMenu, ToggleRightMenu } from 'src/app/store/actions/menu.actions';
import { ApiService } from './shared/services/api.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
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
        private apiService: ApiService,
        private store: Store<IAppState>,
        private cdRef: ChangeDetectorRef
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
        this.subscribeToMainActions();
    }

    private handleRouteChanges() {
        this.store.dispatch(new ToggleLeftMenu({ isOpen: false }));
        this.store.dispatch(new ToggleRightMenu({ isOpen: false }));
    }

    private subscribeToMainActions(): void {
        this.isLoading$.subscribe((response) => {
            this.isLoading.next(response.isAppLoading);
            this.cdRef.detectChanges();
        });
    }
}
