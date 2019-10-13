import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IAppState } from 'src/app/store/state/app.state';
import { ToggleLeftMenu, ToggleRightMenu } from 'src/app/store/actions/menu.actions';
import { selectMain } from 'src/app/store/selectors/main.selectors';
import { TranslateService } from '@ngx-translate/core';
import { SignalRService } from './shared/services/signalrService';

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
        private cdRef: ChangeDetectorRef,
        private translate: TranslateService,
        public signalRService: SignalRService
    ) {
        router.events.subscribe((event: Event) => {

            if (event instanceof NavigationEnd) {
                this.handleRouteChanges();
                // TODO also close all notification messages
            }

        });

        translate.setDefaultLang('en');

    }

    ngOnInit() {
        this.subscribeToMainActions();
        this.signalRService.startConnection();
        this.signalRService.addTransferChartDataListener();
    }

    private handleRouteChanges() {
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
