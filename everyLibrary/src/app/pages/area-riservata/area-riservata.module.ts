import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreaRiservataPageRoutingModule } from './area-riservata-routing.module';

import { AreaRiservataPage } from './area-riservata.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreaRiservataPageRoutingModule
  ],
  declarations: [AreaRiservataPage]
})
export class AreaRiservataPageModule {}
