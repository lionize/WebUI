import { Component, OnInit, HostBinding, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { IAppState } from 'src/app/store/state/app.state';
import { selectLeftMenu } from 'src/app/store/selectors/menu.selectors';
import { LeftMenu } from 'src/app/shared/ui-models/menu.models';
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
    resolution: number;

    constructor(
        private store: Store<IAppState>
    ) {

    }

    ngOnInit() {
        this.menu$.subscribe((menu: LeftMenu) => this.state = menu.isOpen ? 'open' : 'close');
        this.resolution = window.innerWidth;
    }

    @HostBinding('@leftMenuToggleAnimation') 
    get getToggleDrawer(): string {

        if(this.resolution > 768) {
            return this.state === 'open' ? 'open' : 'close';
        }

        return this.state === 'open' ? 'open' : 'closeMobile';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.resolution = event.target.innerWidth;
    }

}
