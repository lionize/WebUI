import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';
import { ProvidersComponent } from 'src/app/pages/admin/providers/providers.component';

const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full', canActivate: [AuthGuard] },
    {
        path: 'admin', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'providers', component: ProvidersComponent, canActivate: [AuthGuard] },
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