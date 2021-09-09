import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibroSingoloPage } from './libro-singolo.page';

const routes: Routes = [
  {
    path: '',
    component: LibroSingoloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibroSingoloPageRoutingModule {}
