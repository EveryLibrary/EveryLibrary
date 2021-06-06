import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Notizia} from '../../../../../../../MyUnivaq/src/app/model/notizia.model';
import {NotiziaService} from '../../../../../../../MyUnivaq/src/app/services/notizia.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dettaglio-notizia',
  templateUrl: './dettaglio-notizia.page.html',
  styleUrls: ['./dettaglio-notizia.page.scss'],
})
export class DettaglioNotiziaPage implements OnInit {
  private notizia$: Observable<Notizia>;

  constructor(private route: ActivatedRoute,
              private notiziaService: NotiziaService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.notizia$ = this.notiziaService.findById(parseInt(params.get('id'), 0));
    });
  }

}
