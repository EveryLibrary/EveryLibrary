import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
        {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
        },
        {
            path: 'login',
            loadChildren: './pages/login/login.module#LoginPageModule'
        },
        {
            path: 'tabs',
            loadChildren: './pages/tabs/tabs.module#TabsPageModule',
            canActivateChild: [AuthGuard]
        },
        {
            path: 'dummy',
            loadChildren: './pages/dummy/dummy.module#DummyPageModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'notizie/:id',
            loadChildren: './pages/dettaglio-notizia/dettaglio-notizia.module#DettaglioNotiziaPageModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'profilo',
            loadChildren: './pages/profilo/profilo.module#ProfiloPageModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'appelli-insegnamento/:id',
            loadChildren: './pages/appelli/appelli.module#AppelliPageModule',
            canActivate: [AuthGuard]
        },


    ]
;

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
