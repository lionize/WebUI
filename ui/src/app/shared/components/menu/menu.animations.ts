import { transition, animate, style, state, trigger } from '@angular/animations';

export const leftMenuToggleAnimation = trigger('leftMenuToggleAnimation', [
    state('open', style({
        marginLeft: '-10px'
    })),
    state('close', style({
        marginLeft: '-310px'
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