import { Component, OnInit, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectMenu } from 'src/app/store/selectors/menu.selectors';
import { IMenu } from 'src/app/shared/components/menu/menu.model';
import { transition, animate, style, state, trigger } from '@angular/animations';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    animations: [
        trigger('openClose', [
            state('open', style({
                marginLeft: '0'
            })),
            state('closed', style({
                marginLeft: '-300px'
            })),
            transition('open => closed', [
                animate(300)
            ]),
            transition('closed => open', [
                animate(300)
            ]),
        ]),
    ],
})

export class MenuComponent implements OnInit {

    menu$ = this.store.pipe(select(selectMenu));
    isOpen: boolean = false;

    constructor(
        private store: Store<IAppState>,
        private elementRef: ElementRef
    ) {

    }

    ngOnInit() {
        this.menu$.subscribe((menu: IMenu) => {
            this.isOpen = menu.isOpen;
            this.isOpen ?
                this.elementRef.nativeElement.classList.add('opened')
                :
                this.elementRef.nativeElement.classList.remove('opened');
        });
    }

}
