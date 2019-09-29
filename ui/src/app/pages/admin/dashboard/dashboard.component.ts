import { Component, OnInit, OnDestroy } from '@angular/core';
import { MATRIX_NUM, ITask } from 'src/app/shared/constants';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError, takeUntil, map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IAppState } from 'src/app/store/state/app.state';
import { selectLeftMenu } from 'src/app/store/selectors/menu.selectors';
import { ToggleLeftMenu } from 'src/app/store/actions/menu.actions';
import { LeftMenu } from 'src/app/shared/components/menu/menu.model';
import { DashboardsService } from './dashboard.service';
import { AppLoading } from 'src/app/store/actions/main.actions';
import { NotificationService } from 'src/app/shared/components/notifications/notification.service';
import { NOTIFICATION_MESSAGES } from 'src/app/shared/messages/notification.messages';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
    tasks = {};
    isLeftMenuOpen: boolean;
    leftMenu$: Observable<LeftMenu> = this.store.pipe(select(selectLeftMenu));
    notificationMessages = NOTIFICATION_MESSAGES;
    matrixTypes = MATRIX_NUM;
    private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        private store: Store<IAppState>,
        private dashboardService: DashboardsService,
        private notificationService: NotificationService,
    ) {

    }

    ngOnInit() {
        this.toggleLeftMenuIcons();
        this.getTasks();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    get containerIds(): string[] {
        return ['DO_FIRST', 'SCHEDULE', 'DELEGATE', 'DONT_DO'];
    }

    toggleLeftMenu(): void {
        this.isLeftMenuOpen = !this.isLeftMenuOpen;
        this.store.dispatch(new ToggleLeftMenu({ isOpen: this.isLeftMenuOpen }));
    }

    private toggleLeftMenuIcons(): void {
        this.leftMenu$.subscribe((menu: LeftMenu) => {
            this.isLeftMenuOpen = menu.isOpen;
        });
    }

    getTasks(): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        // this.store.dispatch(new GetAllProviders());
        this.dashboardService.getTasks()
            .pipe(
                tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                map((response) => {
                    let result = {};
                    response.data.map((item, index, self) => {
                        item.type = MATRIX_NUM[item.type];
                        item.color = this.mapColors(item, item.type);
                        result[item.type] = self.filter((selfItem) => selfItem.type === item.type);
                        return item;
                    });
                    return result;
                }),
                catchError((error) => {
                    this.store.dispatch(new AppLoading({ isAppLoading: false }));
                    this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                        { data: this.notificationMessages.common.error }
                    );
                    return throwError(error);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((data) => {
                this.tasks = data;
                console.log('TASKS: ', this.tasks);
            });
    }

    // TODO move to separate util
    private mapColors(item, type): string {
        switch (type) {
            case MATRIX_NUM[1]:
                item.color = '#99cc11';
                break;

            case MATRIX_NUM[2]:
                item.color = '#4488ee';
                break;

            case MATRIX_NUM[3]:
                item.color = '#ffaa22';
                break;

            case MATRIX_NUM[4]:
                item.color = '#cc1111';
                break;

            default:
                item.color = '#99cc11';
                break;
        }
        return item.color;
    }

    onTaskDrop(event: CdkDragDrop<ITask[]>) {

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            event.item.data.color = event.container.data[0].color;
            event.item.data.type = event.container.data[0].type;
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }

    }

}   
