import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaRiservataPage } from './area-riservata.page';

const routes: Routes = [
  {
    path: 'area-riservata',
    component: AreaRiservataPage,
    children: [{
      path: 'biblioteche', loadChildren: () => import('src/app/pages/biblioteche/biblioteche.module').
      then(res => res.BibliotechePageModule)
    }]
  },
  {
    path: '',
    redirectTo: 'area-riservata/biblioteche',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaRiservataPageRoutingModule {}
