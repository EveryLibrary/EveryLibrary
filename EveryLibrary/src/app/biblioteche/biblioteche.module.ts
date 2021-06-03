import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibliotechePageRoutingModule } from './biblioteche-routing.module';

import { BibliotechePage } from './biblioteche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BibliotechePageRoutingModule
  ],
  declarations: [BibliotechePage]
})
export class BibliotechePageModule {}
