import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibriPrenotatiPage } from './libri-prenotati.page';

const routes: Routes = [
  {
    path: '',
    component: LibriPrenotatiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibriPrenotatiPageRoutingModule {}
