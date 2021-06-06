import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Utente} from '../../../../../../../MyUnivaq/src/app/model/utente.model';
import {UtenteService} from '../../../../../../../MyUnivaq/src/app/services/utente.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  private utente$: BehaviorSubject<Utente>;

  constructor(private utenteService: UtenteService) { }

  ngOnInit() {
    this.utente$ = this.utenteService.getUtente();
  }

}
