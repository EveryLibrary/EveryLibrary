import {Component, OnInit} from '@angular/core';
import {Notizia} from '../../../../../../../MyUnivaq/src/app/model/notizia.model';
import {NotiziaService} from '../../../../../../../MyUnivaq/src/app/services/notizia.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/internal/operators/tap';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-notizie',
  templateUrl: './notizie.page.html',
  styleUrls: ['./notizie.page.scss'],
})
export class NotiziePage implements OnInit {
  private notizie$: Observable<Notizia[]>;

  constructor(private notiziaService: NotiziaService) {
  }

  ngOnInit() {
    this.notizie$ = this.notiziaService.list();
  }

  doRefresh(event) {
    this.notizie$ = this.notiziaService.list()
        .pipe(tap(() => {
          event.target.complete();
        }));
  }

}
