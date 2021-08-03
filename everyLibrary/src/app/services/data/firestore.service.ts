import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Biblioteca } from '../../models/biblioteche.interface';
import {Observable} from 'rxjs';
import {Libro} from '../../models/libri.interface';

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

  getLibriList(): Observable<Libro[]> {
    return this.firestore.collection<Libro>(`Libri`).valueChanges();
  }
  getLibro(libroId: string): Observable<Libro> {
    return this.firestore.collection('Libri').doc<Libro>(libroId).valueChanges();
  }

  /*getListaLibriBiblioteca(bibliotecaId: string): Observable<Libro[]> {
    const idLibri = new Observable<Libro[]>(subscriber => {
      this.firestore.collection('Biblioteche').doc<Biblioteca>(bibliotecaId).collection<Libro>('ListaLibri').valueChanges({
        idField: 'id'
      });
    });
    return idLibri;
  }*/
  getListaLibriBiblioteca(bibliotecaId: string): Observable<Libro[]> {
    const idLibri = new Observable<Libro[]>(subscriber => {
      this.firestore.collectionGroup('Biblioteche/' + bibliotecaId).get().subscribe(res => {
        res.forEach(item =>{
          this.firestore.doc(item.ref.path).collection('ListaLibri').valueChanges();
<<<<<<< HEAD
        });
      });
    });
    return idLibri;
  }
=======
          });
        });
      });
    return idLibri;
    }
>>>>>>> 38282849b86344b32e89f3d4b3defa481d15bfc6
}
