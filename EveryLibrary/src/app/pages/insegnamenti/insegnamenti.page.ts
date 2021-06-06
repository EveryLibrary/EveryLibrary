import { Component, OnInit } from '@angular/core';
import {InsegnamentoService} from '../../../../../../../MyUnivaq/src/app/services/insegnamento.service';
import {Observable} from 'rxjs';
import {Insegnamento} from '../../../../../../../MyUnivaq/src/app/model/insegnamento.model';

@Component({
  selector: 'app-insegnamenti',
  templateUrl: './insegnamenti.page.html',
  styleUrls: ['./insegnamenti.page.scss'],
})
export class InsegnamentiPage implements OnInit {

  private insegnamenti$: Observable<Insegnamento[]>;

  constructor(private insegnamentoService: InsegnamentoService) { }

  ngOnInit() {
    this.insegnamenti$ = this.insegnamentoService.listInsegnamenti();
  }

  openDettaglioInsegnamento(i: Insegnamento) {
    // DO nothing
  }

}
