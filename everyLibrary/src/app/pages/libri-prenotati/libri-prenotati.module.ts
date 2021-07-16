import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibriPrenotatiPageRoutingModule } from './libri-prenotati-routing.module';

import { LibriPrenotatiPage } from './libri-prenotati.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibriPrenotatiPageRoutingModule
  ],
  declarations: [LibriPrenotatiPage]
})
export class LibriPrenotatiPageModule {}
