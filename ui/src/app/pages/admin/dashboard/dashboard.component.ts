import { Component, OnInit, OnDestroy } from '@angular/core';
import { MATRIX_NUM, ITask, MATRIX_TYPE_COLORS, TASK_TYPES } from 'src/app/shared/ui-models/common.models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { tap, catchError, takeUntil, map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { throwError } from 'rxjs/internal/observable/throwError';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IAppState } from 'src/app/store/state/app.state';
import { selectLeftMenu } from 'src/app/store/selectors/menu.selectors';
import { ToggleLeftMenu } from 'src/app/store/actions/menu.actions';
import { LeftMenu } from 'src/app/shared/ui-models/menu.models';
import { DashboardsService } from './dashboard.service';
import { AppLoading } from 'src/app/store/actions/main.actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NOTIFICATION_MESSAGES } from 'src/app/core/messages/notification.messages';
import { SimpleNotificationComponent } from 'src/app/shared/components/notifications/simple/simple-notification.component';
import { Utils } from 'src/app/shared/utils';
import { SignalRService } from 'src/app/core/services/signalr.service';
import { BacklogTask } from 'src/app/shared/ui-models/task-card.models';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
    matrixTasks = {
        DO_FIRST: [],
        SCHEDULE: [],
        DELEGATE: [],
        DONT_DO: []
    };
    backlogTasks: BacklogTask[] = [];
    isLeftMenuOpen: boolean;
    leftMenu$: Observable<LeftMenu> = this.store.pipe(select(selectLeftMenu));
    NOTIFICATION_MESSAGES = NOTIFICATION_MESSAGES;
    // MATRIX_NUM = MATRIX_NUM;
    MATRIX_TYPE_COLORS: typeof MATRIX_TYPE_COLORS = MATRIX_TYPE_COLORS;
    TASK_TYPES: typeof TASK_TYPES = TASK_TYPES;
    private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(
        private store: Store<IAppState>,
        private dashboardService: DashboardsService,
        private notificationService: NotificationService,
        private signalRService: SignalRService
    ) {

    }

    ngOnInit() {
        this.toggleLeftMenuIcons();
        this.getMatrixTasks();
        this.getBacklogTasks();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    get containerIds(): string[] {
        return ['BACKLOG', 'DO_FIRST', 'SCHEDULE', 'DELEGATE', 'DONT_DO'];
    }

    toggleLeftMenu(): void {
        this.isLeftMenuOpen = !this.isLeftMenuOpen;
        this.store.dispatch(new ToggleLeftMenu({ isOpen: this.isLeftMenuOpen }));
    }

    private toggleLeftMenuIcons(): void {
        this.leftMenu$.subscribe((menu: LeftMenu) => this.isLeftMenuOpen = menu.isOpen);
    }

    getMatrixTasks(): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        this.dashboardService.getMatrixTasks()
            .pipe(
                tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                map((response) => {
                    let result = {};
                    response.map((item, index, self) => {
                        item.type = MATRIX_NUM[item.type];
                        item.color = Utils.mapColors(item, item.type);
                        result[item.type] = self.filter((selfItem) => selfItem.type === item.type);
                        return item;
                    });
                    return result;
                }),
                catchError((error) => {
                    this.store.dispatch(new AppLoading({ isAppLoading: false }));
                    this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                        { data: this.NOTIFICATION_MESSAGES.common.error }
                    );
                    return throwError(error);
                }),
                takeUntil(this.destroy$)
            )
            .subscribe((data) => {
                // TODO revert
                // this.matrixTasks = data;
                console.log('MATRIX TASKS: ', this.matrixTasks);
            });
    }

    private getBacklogTasks(): void {
        this.store.dispatch(new AppLoading({ isAppLoading: true }));
        this.dashboardService.getBacklogTasks()
            .pipe(
                tap(() => this.store.dispatch(new AppLoading({ isAppLoading: false }))),
                map((response) => {
                    return response;
                }),
                catchError((error) => {
                    this.store.dispatch(new AppLoading({ isAppLoading: false }));
                    this.notificationService.showNotificationToaster(SimpleNotificationComponent,
                        { data: this.NOTIFICATION_MESSAGES.common.error }
                    );
                    return throwError(error);
                }),
                takeUntil(this.destroy$)
            )
            // TODO fix any type
            .subscribe((data) => {
                this.backlogTasks = data.sort((a, b) => a.Order - b.Order);
                console.log('BACKLOG TASKS: ', this.backlogTasks);
            });
    }

    onTaskDrop(event: CdkDragDrop<ITask[]>) {
        const color = this.MATRIX_TYPE_COLORS[event.container.id];


        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            // TODO bad solution, use enum
            let color = this.MATRIX_TYPE_COLORS[event.container.id];
            let type;
            for (let prop in this.MATRIX_TYPE_COLORS) {
                if (color === this.MATRIX_TYPE_COLORS[prop]) {
                    type = prop
                }
            }
            event.item.data.color = color;
            event.item.data.type = type;
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }

        console.log('MATRIX TASKS: ', this.matrixTasks);

        // FIXME hardcode
        const task = {
            TaskId: event.item.data.id,
            Order: event.item.data.order,
            Important: true,
            Urgent: true,
        };
        this.signalRService.emitMoveToMatrix(task)
            .subscribe((response) => {
                console.log(response);
            })

    }

}   
