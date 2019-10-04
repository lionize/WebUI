import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

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

    getMatrixTasks(): Observable<any> {
        return this.apiService.get(`${environment.Task_Management_Service}Matrix`);
    }

    getBacklogTasks(): Observable<any> {
        return this.apiService.get(`${environment.Task_Management_Service}Matrix/Backlog`);
    }

}