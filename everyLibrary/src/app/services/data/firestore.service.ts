import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Biblioteca } from '../../models/biblioteche.interface';
import {Observable} from 'rxjs';
import {Libri} from '../../models/libri.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) {}

  getBibliotecheList(): Observable<Biblioteca[]> {
    return this.firestore.collection<Biblioteca>(`Biblioteche`).valueChanges();
  }

  getBiblioteca(bibliotecaId: string): Observable<Biblioteca> {
    return this.firestore.collection('Biblioteche').doc<Biblioteca>(bibliotecaId).valueChanges();
  }

  getLibriList(): Observable<Libri[]> {
    return this.firestore.collection<Libri>(`Libri`).valueChanges();
  }
  getLibro(libroId: string): Observable<Libri> {
    return this.firestore.collection('Libri').doc<Libri>(libroId).valueChanges();
  }


  /*getListaLibriBiblioteca(bibliotecaId: string): Observable<Libro[]> {
    return this.firestore.collection('Biblioteche/'+ bibliotecaId +'/ListaLibri').get();
  }*/

}
