import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AppelliPage} from './appelli.page';
import {TranslateModule} from '@ngx-translate/core';
import {DettaglioAppelloPageModule} from '../../../../../../../MyUnivaq/src/app/pages/dettaglio-appello/dettaglio-appello.module';

const routes: Routes = [
    {
        path: '',
        component: AppelliPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
        DettaglioAppelloPageModule,
        RouterModule.forChild(routes)
    ],
    declarations: [AppelliPage]
})
export class AppelliPageModule {
}
