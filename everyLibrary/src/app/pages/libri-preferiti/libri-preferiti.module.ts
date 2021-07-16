import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibriPreferitiPageRoutingModule } from './libri-preferiti-routing.module';

import { LibriPreferitiPage } from './libri-preferiti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibriPreferitiPageRoutingModule
  ],
  declarations: [LibriPreferitiPage]
})
export class LibriPreferitiPageModule {}
