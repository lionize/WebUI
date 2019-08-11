import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from 'src/app/pages/public/authentication/login/login.component';
// import { RegisterComponent } from 'src/app/pages/public/authentication/register/register.component';
import { LandingComponent } from 'src/app/pages/public/landing/landing.component';

const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'auth', loadChildren: 'src/app/pages/public/authentication/authentication.module#AuthenticationModule' },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    { path: 'landing', component: LandingComponent },
    { path: '**', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class PublicRoutingModule { }