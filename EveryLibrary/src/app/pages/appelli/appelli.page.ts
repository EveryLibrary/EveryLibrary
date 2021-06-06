import {Component, OnInit} from '@angular/core';
import {InsegnamentoService} from '../../../../../../../MyUnivaq/src/app/services/insegnamento.service';
import {Observable} from 'rxjs';
import {Appello, TIPOLOGIA_ESAME_SCRITTO} from '../../../../../../../MyUnivaq/src/app/model/appello.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AlertController, IonItemSliding, ModalController} from '@ionic/angular';
import {DettaglioAppelloPage} from '../../../../../../../MyUnivaq/src/app/pages/dettaglio-appello/dettaglio-appello.page';
import {OverlayEventDetail} from '@ionic/core';
import {Insegnamento} from '../../../../../../../MyUnivaq/src/app/model/insegnamento.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-appelli',
  templateUrl: './appelli.page.html',
  styleUrls: ['./appelli.page.scss'],
})
export class AppelliPage implements OnInit {
  private appelli$: Observable<Appello[]>;
  private idInsegnamento: number;
  private deleteTitle: string;
  private messageTitle: string;
  private deleteButton: string;
  private cancelButton: string;

  constructor(private route: ActivatedRoute,
              private modalController: ModalController,
              private alertController: AlertController,
              private translateService: TranslateService,
              private insegnamentoService: InsegnamentoService) {
  }

  ngOnInit() {
    this.initTranslate();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idInsegnamento = parseInt(params.get('id'), 0);
      this.listAppelli();
    });
  }

  async createAppello() {
    const appello = new Appello();
    appello.tipologiaEsame = TIPOLOGIA_ESAME_SCRITTO;
    appello.insegnamento = new Insegnamento();
    appello.insegnamento.id = this.idInsegnamento;
    const modal = await this.modalController.create({
      component: DettaglioAppelloPage,
      componentProps: {appParam: appello}
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null && detail.data !== undefined) {
        this.insegnamentoService.createAppello(detail.data).subscribe(() => {
          this.listAppelli();
        });
      } else {
        console.log('cancel button pressed');
      }
    });

    await modal.present();
  }

  async updateAppello(appello: Appello, sliding: IonItemSliding) {
    sliding.close();
    const modal = await this.modalController.create({
      component: DettaglioAppelloPage,
      componentProps: {appParam: appello}
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null && detail.data !== undefined) {
        this.insegnamentoService.updateAppello(detail.data).subscribe(() => {
          this.listAppelli();
        });
      } else {
        console.log('cancel button pressed');
      }
    });
    return await modal.present();
  }

  async deleteAppello(appello: Appello, sliding: IonItemSliding) {
    sliding.close();
    const alert = await this.alertController.create({
      header: this.deleteTitle,
      message: this.messageTitle,
      buttons: [
        {
          text: this.cancelButton,
          handler: () => {
            console.log('Annulla clicked');
          }
        },
        {
          text: this.deleteButton,
          handler: () => {
            this.insegnamentoService.deleteAppello(appello).subscribe(() => {
              this.listAppelli();
            });

          }
        }
      ]
    });

    await alert.present();
  }

  listAppelli() {
    this.appelli$ = this.insegnamentoService.listAppelli(this.idInsegnamento);
  }

  initTranslate() {
    this.translateService.get('APPELLO_DELETE_TITLE').subscribe((data: string) => {
      this.deleteTitle = data;
    });
    this.translateService.get('APPELLO_DELETE_MESSAGE').subscribe((data: string) => {
      this.messageTitle = data;
    });
    this.translateService.get('DELETE_BUTTON').subscribe((data: string) => {
      this.deleteButton = data;
    });
    this.translateService.get('CANCEL_BUTTON').subscribe((data: string) => {
      this.cancelButton = data;
    });
  }

}
