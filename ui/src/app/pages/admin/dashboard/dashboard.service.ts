import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class DashboardsService {

    constructor(
        private apiService: ApiService
    ) {

    }

    // Fake service
    getTasks(): Observable<any> {
        return this.apiService.get(`/assets/fake-data/tasks.json`);
    }

}