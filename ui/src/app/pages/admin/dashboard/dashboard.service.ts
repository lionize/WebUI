import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import { MatrixTask, BacklogTask, UIMatrixTask } from 'src/app/shared/components/business-components/task-card/task-card.model';

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