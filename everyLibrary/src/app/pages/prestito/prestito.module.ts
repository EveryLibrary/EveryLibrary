import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestitoPageRoutingModule } from './prestito-routing.module';

import { PrestitoPage } from './prestito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestitoPageRoutingModule
  ],
  declarations: [PrestitoPage]
})
export class PrestitoPageModule {}
