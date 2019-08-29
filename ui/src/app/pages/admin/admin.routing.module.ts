import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full', canActivate: [AuthGuard] },
    {
        path: 'admin', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            // { path: '**', redirectTo: 'dashboard' }
        ]
    },
    { path: '**', redirectTo: 'admin' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminRoutingModule { }