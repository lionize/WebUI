import { Component, OnInit } from '@angular/core';
import { IMatrixDetail, matrixDetailed } from 'src/app/shared/constants';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectLeftMenu } from 'src/app/store/selectors/menu.selectors';
import { ToggleLeftMenu } from 'src/app/store/actions/menu.actions';
import { LeftMenu } from 'src/app/shared/components/menu/menu.model';
import { Observable } from 'rxjs/internal/Observable';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    matrixDetailed: IMatrixDetail[] = matrixDetailed;
    isLeftMenuOpen: boolean;
    leftMenu$: Observable<LeftMenu> = this.store.pipe(select(selectLeftMenu));

    constructor(
        private store: Store<IAppState>,
    ) {
        
    }

    ngOnInit() {
        this.toggleLeftMenuIcons();
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
    
}   
