import {Component, OnInit} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LinguaService} from './services/lingua.service';
import {UtenteService} from './services/utente.service';
import {TranslateService} from '@ngx-translate/core';
import {Utente} from './model/utente.model';
import {BehaviorSubject} from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
    private utente$: BehaviorSubject<Utente>;

    private menuStudenti  = [
        {title: 'PIANO_STUDI_MENU', url: 'dummy', icon: 'school'},
        {title: 'TASSE_MENU', url: 'dummy', icon: 'cash'},
        {title: 'LIBRETTO_MENU', url: 'dummy', icon: 'book'}
    ];

    private menuDocenti = [
        {title: 'MIE_NOTIZIE_MENU', url: 'dummy', icon: 'albums'},
        {title: 'APPROVAZIONE_PIANI_MENU', url: 'dummy', icon: 'barcode'},
        {title: 'DIARIO_MENU', url: 'dummy', icon: 'book'},
        {title: 'QUESTIONARIO_MENU', url: 'dummy', icon: 'help-circle'}
    ];


    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private linguaService: LinguaService,
                private utenteService: UtenteService,
                private translate: TranslateService,
                private navController: NavController,
                private statusBar: StatusBar) {
        this.initializeApp();
    }

    ngOnInit(): void {
        this.utente$ = this.utenteService.getUtente();
        this.navController.navigateRoot('tabs');
    }

    profilo() {
        this.navController.navigateForward('profilo');
    }

    openPage(url: string) {
        this.navController.navigateForward(url);
    }

    logout() {
        this.utenteService.logout();
        this.navController.navigateRoot('login');
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.initTranslate();
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        const linguaPreferita = this.linguaService.getLinguaPreferita();
        this.translate.setDefaultLang(linguaPreferita);
        this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
            if (lingua != null) {
                this.translate.use(lingua);
            } else {
                this.translate.use(linguaPreferita);
                this.linguaService.updateLingua(linguaPreferita);
            }
        });
    }

}
