import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliotechePage } from './biblioteche.page';

const routes: Routes = [
  {
    path: '',
    component: BibliotechePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliotechePageRoutingModule {}
