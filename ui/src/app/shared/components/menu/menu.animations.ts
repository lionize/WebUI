import { transition, animate, style, state, trigger } from '@angular/animations';

export const leftMenuToggleAnimation = trigger('leftMenuToggleAnimation', [
    state('open', style({
        marginLeft: '-50px'
    })),
    state('close', style({
        marginLeft: '-300px'
    })),
    transition('open <=> close', [
        animate(250)
    ])
]);

export const rightMenuToggleAnimation = trigger('rightMenuToggleAnimation', [
    state('open', style({
        transform: 'translateX(0)'
    })),
    state('close', style({
        transform: 'translateX(100%)'
    })),
    transition('open <=> close', [
        animate(150)
    ])
]);