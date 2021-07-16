import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'biblioteche',
    loadChildren: () => import('./pages/biblioteche/biblioteche.module').then( m => m.BibliotechePageModule)
  },
  {
    path: 'area-riservata',
    loadChildren: () => import('./pages/area-riservata/area-riservata.module').then( m => m.AreaRiservataPageModule),
    canActivate: [AuthGuard]
  },  {
    path: 'libri-preferiti',
    loadChildren: () => import('./pages/libri-preferiti/libri-preferiti.module').then( m => m.LibriPreferitiPageModule)
  },
  {
    path: 'libri-prenotati',
    loadChildren: () => import('./pages/libri-prenotati/libri-prenotati.module').then( m => m.LibriPrenotatiPageModule)
  },
  {
    path: 'biblioteca',
    loadChildren: () => import('./pages/biblioteca/biblioteca.module').then( m => m.BibliotecaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
