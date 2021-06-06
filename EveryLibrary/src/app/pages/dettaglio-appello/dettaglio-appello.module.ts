import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DettaglioAppelloPage} from './dettaglio-appello.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  entryComponents: [DettaglioAppelloPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    IonicModule
  ],
  declarations: [DettaglioAppelloPage]
})
export class DettaglioAppelloPageModule {
}
