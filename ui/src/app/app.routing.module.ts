import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/pages/authentication/authentication.module').then(module => module.AuthenticationModule),
    },
    {
        path: '',
        loadChildren: () => import('src/app/pages/admin/admin.module').then(module => module.AdminModule),
        canLoad: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'landing'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
