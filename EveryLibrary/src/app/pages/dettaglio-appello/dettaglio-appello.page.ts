import {Component, OnInit} from '@angular/core';
import {Appello, TIPOLOGIE_ESAMI} from '../../../../../../../MyUnivaq/src/app/model/appello.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-dettaglio-appello',
  templateUrl: './dettaglio-appello.page.html',
  styleUrls: ['./dettaglio-appello.page.scss'],
})
export class DettaglioAppelloPage implements OnInit {

  private tipologieEsame = TIPOLOGIE_ESAMI;
  private appello: Appello;
  private appelloFormModel: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private modalController: ModalController,
              private navParams: NavParams) {
  }

  ngOnInit() {
    this.appello = this.navParams.data.appParam;
    this.appelloFormModel = this.formBuilder.group({
      descrizione: [this.appello.descrizione, Validators.compose([
        Validators.required
      ])],
      tipologiaEsame: [this.appello.tipologiaEsame, Validators.compose([
        Validators.required
      ])],
      dataAppello: [this.appello.dataAppello, Validators.compose([
        Validators.required
      ])]
    });
  }

  async onSubmit() {
    this.appello.descrizione = this.appelloFormModel.value.descrizione;
    this.appello.tipologiaEsame = this.appelloFormModel.value.tipologiaEsame;
    this.appello.dataAppello = this.appelloFormModel.value.dataAppello;
    await this.modalController.dismiss(this.appello);
  }
  async cancel() {
    await this.modalController.dismiss();
  }

}
