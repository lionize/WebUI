import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { LoginComponent } from 'src/app/pages/public/login/login.component';
import { LandingComponent } from 'src/app/pages/public/landing/landing.component';

const routes: Routes = [
    // { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: '', loadChildren: 'src/app/pages/private/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
    { path: '', loadChildren: 'src/app/pages/public/public.module#PublicModule' },
    // { path: 'login', component: LoginComponent },
    // { path: 'landing', component: LandingComponent },
    // { path: '**', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
