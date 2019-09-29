import { Component, OnInit, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IAppState } from 'src/app/store/state/app.state';
import { selectLeftMenu } from 'src/app/store/selectors/menu.selectors';
import { LeftMenu } from 'src/app/shared/components/menu/menu.model';
import { leftMenuToggleAnimation } from '../menu.animations';

@Component({
    selector: 'li-left-menu',
    templateUrl: './left-menu.component.html',
    styleUrls: ['./left-menu.component.scss'],
    animations: [leftMenuToggleAnimation]
})

export class LeftMenuComponent implements OnInit {
    menu$: Observable<LeftMenu> = this.store.pipe(select(selectLeftMenu));
    state: 'open' | 'close' = 'close';

    constructor(
        private store: Store<IAppState>
    ) {

    }

    ngOnInit() {
        this.menu$.subscribe((menu: LeftMenu) => this.state = menu.isOpen ? 'open' : 'close');
    }

    @HostBinding('@leftMenuToggleAnimation') get getToggleDrawer(): string {
        return this.state === 'open' ? 'open' : 'close';
    }

}
