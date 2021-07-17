import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestitoPage } from './prestito.page';

const routes: Routes = [
  {
    path: '',
    component: PrestitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestitoPageRoutingModule {}
