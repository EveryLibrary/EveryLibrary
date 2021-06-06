import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL } from '../../../../../../MyUnivaq/src/app/constants';
import { Appello } from '../../../../../../MyUnivaq/src/app/model/appello.model';
import { Insegnamento } from '../../../../../../MyUnivaq/src/app/model/insegnamento.model';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class InsegnamentoService {

    constructor(private http: HttpClient) {

    }

    listInsegnamenti(): Observable<Insegnamento[]> {
        return this.http.get<Insegnamento[]>(URL.INSEGNAMENTI);
    }

    listAppelli(idInsegnamento): Observable<Appello[]> {
        const appelliUrl = `${URL.INSEGNAMENTI}/${idInsegnamento}/appelli`;
        return this.http.get<Appello[]>(appelliUrl);
    }

    createAppello(appello: Appello) {
        return this.http.post<Appello>(URL.APPELLI, appello);
    }

    findAppelloById(idAppello: number): Observable<Appello> {
        const appelloUrl = `${URL.APPELLI}/${idAppello}`;
        return this.http.get<Appello>(appelloUrl);
    }

    updateAppello(appello: Appello) {
        return this.http.put<Appello>(URL.APPELLI, appello);
    }

    deleteAppello(appello: Appello) {
        const deleteUrl = `${URL.APPELLI}/${appello.id}`;
        return this.http.delete<Appello>(deleteUrl);
    }
}
