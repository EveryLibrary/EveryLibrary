import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreaRiservataPage } from './area-riservata.page';

const routes: Routes = [
  {
    path: '',
    component: AreaRiservataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaRiservataPageRoutingModule {}
