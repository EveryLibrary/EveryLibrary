import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaLibriPageRoutingModule } from './lista-libri-routing.module';

import { ListaLibriPage } from './lista-libri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaLibriPageRoutingModule
  ],
  declarations: [ListaLibriPage]
})
export class ListaLibriPageModule {}
