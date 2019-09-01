import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';
import { ProfileComponent } from 'src/app/pages/admin/profile/profile.component';

const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: 'full', canActivate: [AuthGuard] },
    {
        path: 'admin', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
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