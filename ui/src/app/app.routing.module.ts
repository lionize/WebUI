import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/pages/authentication/authentication.module').then(module => module.AuthenticationModule),
        // loadChildren: 'src/app/pages/public/public.module#PublicModule'
    },
    {
        path: '',
        loadChildren: () => import('src/app/pages/admin/admin.module').then(module => module.AdminModule),
        // loadChildren: 'src/app/pages/private/admin/admin.module#AdminModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'landing',
        loadChildren: () => import('src/app/pages/landing/landing.module').then(module => module.LandingModule),
    },
    // { path: '', redirectTo: 'landing', pathMatch: 'full' },
    // { path: 'landing', component: LandingComponent },
    // { path: '**', redirectTo: 'landing' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        // {
        //     preloadingStrategy: PreloadAllModules
        // }
    )],
    exports: [RouterModule]
})

export class AppRoutingModule { }
