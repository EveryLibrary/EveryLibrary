import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';
import {Biblioteca} from '../../models/biblioteche.interface';
import {Observable} from 'rxjs';
import {Libro, LibroPreferito, LibroPrestato} from '../../models/libri.interface';
import firebase from 'firebase';
import {count, first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private db = firebase.firestore();

  constructor(public firestore: AngularFirestore) { }

  getBibliotecheList(): Observable<any[]> {
    return this.firestore.collection<Biblioteca>(`Biblioteche`).valueChanges();
  }

  getBiblioteca(bibliotecaId: string): Observable<Biblioteca> {
    return this.firestore.collection('Biblioteche').doc<Biblioteca>(bibliotecaId).valueChanges();
  }

  getLibriList(): Observable<Libro[]> {
    return this.firestore.collection<Libro>(`Libri`).valueChanges();
  }

   async getLibriPreferitiList(uid: string) {
     let list: Array<{ libroId: string }>;
     const listaLibriPreferiti: Array<Libro> = [];

     await this.metodoPref(uid).then(value => {
       list = value;
     });
     for (let i = 0; i < list.length; i++) {
       console.log(list[i]);
       listaLibriPreferiti.push(await this.firestore.collection<Libro>('Libri')
         .doc(list[i].toString())
         .valueChanges().pipe(first()).toPromise());
       //.forEach(libro => {console.log(libro);});
     }
     return listaLibriPreferiti;
     //return this.firestore.collection<Libro>(`LibriPreferiti`, ref => ref.where('userId','==',uid))
     //  .valueChanges();

     /*this.firestore.collection<LibroPreferito>(`LibriPreferiti`, ref => ref.where('userId','==',uid))
       .valueChanges().subscribe(
       snaps => {
         snaps.forEach(
           snap=>{
             console.log(snap.libroId);
             console.log(snap.userId);
             return this.firestore.collection<Libro>('Libro', ref => ref.where('id','==',snap.libroId)).valueChanges();
             //this.navController.navigateForward(['libro/', snap.get('id')]);
           }
         );
       }
     );*/
   }



  getLibro(libroId: string): Observable<Libro> {
    return this.firestore.doc<Libro>('/Libri/'+libroId).valueChanges();
  }
  getListaLibriBiblioteca(bibliotecaId: string): Observable<any[]> {
    return this.firestore.collection<Libro>('Biblioteche/' + bibliotecaId + '/ListaLibri').valueChanges();
  }
  aggiungiPreferito(userUid: string, id: string) {
    this.firestore.collection('LibriPreferiti').add({
      userId: ''+userUid,
      libroId: ''+id
    });
  }
  async metodoPref(uid: string) {
    const list: Array<{ libroId: string }> = [];
    console.log('METODO PREF: ');
    await this.db.collection('LibriPreferiti').where('userId', '==', uid).get().then(
      querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(document => {
            list.push(document.get('libroId'));
            console.log('documento:' + document.get('libroId'));
            console.log('documento:' + document.get('userId'));
            console.log('list:' + list);
          });
        }
      }
    );
    console.log('FINE METODO PREF....');
    return list;
  }
  rimuoviPreferito(userUid: string, id: string) {
    this.db.collection('LibriPreferiti')
      .where('libroId', '==', id)
      .where('userId','==',userUid).get().then(
      querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach( document => {
            console.log('docID:' + document.id);
            this.firestore.collection('LibriPreferiti').doc(document.id).delete();
          });
        }
      });
    const docRef = this.firestore.collection('LibriPreferiti',
        ref => ref.where('libroId', '==', id)).doc(id);
    console.log('Rimuovi:' + docRef);
  }

  async verificaPreferito(userUid: string, id: string): Promise<boolean>{
    console.log('Metodo verificaPreferito:');
    let cond: boolean;
     await this.db.collection('LibriPreferiti')
       .where('libroId', '==', id)
       .where('userId','==',userUid)
       .get()
       .then((doc) => {
      if (doc.size !== 0) {
        console.log(doc.docs);
        console.log('libro preferito');
        console.log('Document data:', doc.size);
        cond = true;
        return true;
      } else {
        cond = false;
        console.log('libro non preferito');
        // doc.data() will be undefined in this case
        console.log('No such document!');
        return false;
      }
    });
    console.log('COND: ' + cond);
    console.log('Fine Metodo verificaPreferito');
    return cond;
  }

  async getLibriPrestatiList(uid: string) {
    let list: Array<{ libroId: string }>;
    const listaLibriPrestati: Array<Libro> = [];
    await this.metodoPrestito(uid).then(value => {
      list = value;
    });
    for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      listaLibriPrestati.push(await this.firestore.collection<Libro>('Libri')
        .doc(list[i].toString())
        .valueChanges().pipe(first()).toPromise());
    }
    return listaLibriPrestati;
  }
  async metodoPrestito(uid: string) {
    const list: Array<{ libroId: string }> = [];
    await this.db.collection('LibriPrestati').where('idUtente', '==', uid).get().then(
      querySnapshot => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach(document => {
            list.push(document.get('idLibro'));
          });
        }
      }
    );
    return list;
  }

  aggiungiPrestito(idUser: string, libroId: string, idBiblioteca: string, today: string, dataRitiro: string) {
    this.firestore.collection('LibriPrestati').add({
      idUtente: ''+idUser,
      idLibro: ''+libroId,
      idBiblioteca: ''+idBiblioteca,
      dataRitiro: ''+dataRitiro,
      dataPrenotazione: ''+today,
    });
    this.db.collection('Libri')
      .where('id', '==', libroId)
      .get().then(
      querySnapshot => {
          querySnapshot.forEach( document => {
            this.firestore.collection('Libri').doc(document.id).update({
                numero_copie: firebase.firestore.FieldValue.increment(-1)
              }
            );
          });
        });
  }
  async verificaPrestito(userUid: string, id: string): Promise<boolean>{
    let cond: boolean;
    await this.db.collection('LibriPrestati')
      .where('idLibro', '==', id)
      .where('idUtente','==',userUid)
      .get()
      .then((doc) => {
        if (doc.size !== 0) {
          cond = true;
          return true;
        } else {
          cond = false;
          return false;
        }
      });
    return cond;
  }
  /*getLibroPrestato(libroId: string, bibliotecaId: string, utenteId: string): Observable<any> {
    return this.firestore.collection('LibriPrestati', ref =>
      ref.where('idLibro', '==', libroId)
        .where('idBiblioteca', '==', bibliotecaId)
        .where('idUtente', '==', utenteId)).valueChanges();
  }*/
}
