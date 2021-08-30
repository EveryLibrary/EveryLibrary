import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibliotecaPageRoutingModule } from './biblioteca-routing.module';

import { BibliotecaPage } from './biblioteca.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BibliotecaPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [BibliotecaPage]
})
export class BibliotecaPageModule {}
