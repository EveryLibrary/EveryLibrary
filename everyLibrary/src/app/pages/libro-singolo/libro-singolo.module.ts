import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibroSingoloPageRoutingModule } from './libro-singolo-routing.module';

import { LibroSingoloPage } from './libro-singolo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibroSingoloPageRoutingModule
  ],
  declarations: [LibroSingoloPage]
})
export class LibroSingoloPageModule {}
