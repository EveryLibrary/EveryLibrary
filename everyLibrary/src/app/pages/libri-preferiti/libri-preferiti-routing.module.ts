import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibriPreferitiPage } from './libri-preferiti.page';

const routes: Routes = [
  {
    path: '',
    component: LibriPreferitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibriPreferitiPageRoutingModule {}
