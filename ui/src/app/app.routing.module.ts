import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

const routes: Routes = [
    { path: '', loadChildren: 'src/app/pages/private/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
    { path: '', loadChildren: 'src/app/pages/public/public.module#PublicModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
