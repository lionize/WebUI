import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { LoginComponent } from 'src/app/pages/public/login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', loadChildren: 'src/app/pages/private/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
