import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/shared/services/api.service';
// import { Lionize } from 'src/app/shared/models/habitica/Lionize';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProvidersService {

    constructor(
        private apiService: ApiService
    ) {

    }

    getHabitica(): Observable<any> {
        return this.apiService.get(`${environment.habiticaTaskProviderService}Settings`);
    }

    postHabitica(payload: any): Observable<any> {
        return this.apiService.post(`${environment.habiticaTaskProviderService}Settings`, payload);
    }

    putHabitica(id: string, payload: any): Observable<any> {
        return this.apiService.put(`${environment.habiticaTaskProviderService}Settings/${id}`, payload);
    }

}