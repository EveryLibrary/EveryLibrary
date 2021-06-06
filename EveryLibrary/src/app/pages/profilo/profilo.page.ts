import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Lingua, LinguaService} from '../../../../../../../MyUnivaq/src/app/services/lingua.service';
import {UtenteService} from '../../../../../../../MyUnivaq/src/app/services/utente.service';
import {BehaviorSubject} from 'rxjs';
import {Utente} from '../../../../../../../MyUnivaq/src/app/model/utente.model';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.page.html',
  styleUrls: ['./profilo.page.scss'],
})
export class ProfiloPage implements OnInit {

  private lingue: Lingua[];
  private profiloFormModel: FormGroup;
  private utente: Utente;

  constructor(private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private linguaService: LinguaService,
              private utenteService: UtenteService,
              private navController: NavController) {
  }

  ngOnInit() {
    this.lingue = this.linguaService.getLingue();
    this.profiloFormModel = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      telefono: [''],
      linguaPreferita: ['', Validators.compose([
        Validators.required
      ])]
    });

    this.linguaService.getLinguaAttuale().subscribe((lingua) => {
      this.profiloFormModel.patchValue({linguaPreferita: lingua});
    });
    this.utenteService.getUtente().subscribe((utente) => {
      this.profiloFormModel.patchValue({email: utente.email, telefono: utente.telefono});
      this.utente = utente;
    });
  }

  onSubmit(): void {
    this.translateService.use(this.profiloFormModel.value.linguaPreferita);
    this.linguaService.updateLingua(this.profiloFormModel.value.linguaPreferita);
    this.utente.email = this.profiloFormModel.value.email;
    this.utente.telefono = this.profiloFormModel.value.telefono;
    this.utenteService.updateProfilo(this.utente).subscribe((nuovoUtente: Utente) => {
      this.navController.back();
    });
  }

  cancel() {
    this.navController.back();
  }
}
