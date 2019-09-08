import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/shared/services/api.service';
import { Lionize } from 'src/app/shared/models/habitica/Lionize';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProvidersService {

    constructor(
        private apiService: ApiService
    ) {
    }

    // TODO type Observable and response
    saveHabitica(payload): Observable<any> {
        return this.apiService.post(`${environment.habiticaTaskProviderService}Settings`, payload)
            .pipe(map((response) => response));
    }

    // TODO type Observable and response
    getHabitica(): Observable<any> {
        return this.apiService.get(`${environment.habiticaTaskProviderService}Settings`)
            .pipe(map((response) => response));
    }

}