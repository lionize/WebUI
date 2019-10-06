import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/shared/services/api.service';
// import { Lionize } from 'src/app/shared/models/habitica/Lionize';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map } from 'rxjs/internal/operators/map';

@Injectable({ providedIn: 'root' })
export class ProvidersService {

    constructor(
        private apiService: ApiService
    ) {

    }

    getHabitica(): Observable<any> {
        return this.apiService.get(`${environment.Habitica_Task_Provider_Service}Settings`);
    }

    postHabitica(payload: any): Observable<any> {
        return this.apiService.post(`${environment.Habitica_Task_Provider_Service}Settings`, payload);
    }

    putHabitica(id: string, payload: any): Observable<any> {
        return this.apiService.put(`${environment.Habitica_Task_Provider_Service}Settings/${id}`, payload);
    }

    getAllProviders(): Observable<any> {
        const habiticaRequest = this.getHabitica();
        // TODO other requests
        return forkJoin([habiticaRequest])
            .pipe(
                map((response) => {
                    return {
                        habitica: response[0]
                    }
                })
            );
    }

}