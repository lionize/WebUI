import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';
import { MatrixTask, BacklogTask } from 'src/app/shared/components/business-components/task-card/task-card.models';

interface UIMatrixTask extends MatrixTask {
    color: string;
    // TODO remove type: string (use urgent: boolean, important: boolean)
    type: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardsService {

    constructor(
        private apiService: ApiService
    ) {

    }

    // Fake service
    getMatrixTasks_fake(): Observable<any> {
        return this.apiService.get(`/assets/fake-data/tasks.json`);
    }

    getMatrixTasks(): Observable<UIMatrixTask[]> {
        return this.apiService.get(`${environment.Task_Management_Service}Matrix`);
    }

    getBacklogTasks(): Observable<BacklogTask[]> {
        return this.apiService.get(`${environment.Task_Management_Service}Matrix/Backlog`);
    }

}