import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {TabsPage} from './tabs.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'notizie',
                children: [
                    {
                        path: '',
                        loadChildren: '../notizie/notizie.module#NotiziePageModule'
                    }
                ]
            },
            {
                path: 'insegnamenti',
                children: [
                    {
                        path: '',
                        loadChildren: '../insegnamenti/insegnamenti.module#InsegnamentiPageModule'
                    }
                ]
            },
            {
                path: 'lezioni',
                children: [
                    {
                        path: '',
                        loadChildren: '../dummy-tab/dummy-tab.module#DummyTabPageModule'
                    }
                ]
            },
            {
                path: 'appelli',
                children: [
                    {
                        path: '',
                        loadChildren: '../dummy-tab/dummy-tab.module#DummyTabPageModule'
                    }
                ]
            },
            {
                path: 'orario',
                children: [
                    {
                        path: '',
                        loadChildren: '../dummy-tab/dummy-tab.module#DummyTabPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/notizie',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes)
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
