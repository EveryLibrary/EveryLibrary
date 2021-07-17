import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaLibriPage } from './lista-libri.page';

const routes: Routes = [
  {
    path: '',
    component: ListaLibriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaLibriPageRoutingModule {}
