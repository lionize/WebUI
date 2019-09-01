import { transition, animate, style, state, trigger } from '@angular/animations';

export const leftOpenCloseAnimation = trigger('leftOpenCloseAnimation', [
    state('open', style({
        marginLeft: '0'
    })),
    state('close', style({
        marginLeft: '-240px'
    })),
    transition('open <=> close', [
        animate(200)
    ])
]);

export const rightOpenCloseAnimation = trigger('rightOpenCloseAnimation', [
    state('open', style({
        transform: 'translateX(0)'
    })),
    state('close', style({
        transform: 'translateX(100%)'
    })),
    transition('open <=> close', [
        animate(200)
    ])
]);