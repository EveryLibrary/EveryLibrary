import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';
import {Biblioteca} from '../../models/biblioteche.interface';
import {Observable} from 'rxjs';
import {Libro, LibroPreferito} from '../../models/libri.interface';
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
    //return this.firestore.collection<Libro>(`Libri`).doc<Libro>(libroId).valueChanges();
    /*get()
      .subscribe(snap =>{
        console.log(snap.data());
      });
     return null;*/
    /*const citiesRef = this.db.collection('Libri');
    this.db.collection('Libri').where('id', '==', ''+libroId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log('QUERY: ' + doc.id, ' => ', doc.data());
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
      return ;*/
    /*this.db.collection('Libri').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });*/
    //console.log(this.db.collection('Libri', ref => ref.where('id','==',libroId)));
    //this.firestore.collection('Libri', ref => ref.where('id','==',libroId)).doc<Libro>(libroId).valueChanges();
    //return this.db.collection('Libri').where('id', '==', libroId).;
  }

  /*getListaLibriBiblioteca(bibliotecaId: string): Observable<Libro[]> {
    const idLibri = new Observable<Libro[]>(subscriber => {
      this.firestore.collection('Biblioteche').doc<Biblioteca>(bibliotecaId).collection<Libro>('ListaLibri').valueChanges({
        idField: 'id'
      });
    });
    return idLibri;
  }*/
  getListaLibriBiblioteca(bibliotecaId: string): Observable<any[]> {
    return this.firestore.collection<Libro>('Biblioteche/' + bibliotecaId + '/ListaLibri').valueChanges();
    /*const idLibri = new Observable<Libro[]>(subscriber => {
      this.firestore.collection('Biblioteche').ref.where('id','==',bibliotecaId).get().subscribe(res => {
        res
          .forEach(item =>{
            console.log(item.ref.path);
          this.firestore.doc(item.ref.path).collection('ListaLibri').valueChanges();
        });
      });
    });
    return idLibri;*/
    /*var i = 0;
    var docRef = this.firestore.collection('Biblioteche').ref.where('id','==',bibliotecaId);
    docRef.get().then((querySnapshot) => {
      querySnapshot.forEach( (doc) => {
        this.listaLibri = this.firestore.collection<Libro>('ListaLibri').valueChanges();
        console.log(i++);
      });
    });

    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
      });
    });

    */
    /*var docRef = this.db.ref("Biblioteche/" + bibliotecaId + "/ListaLibri").once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
      });
    });
    firebase.firestore().collection('Biblioteche').get().then((snapshot)=> {
      console.log(snapshot.docs);
    })

    */
    /*return firebase.firestore().collection('Biblioteche/' + bibliotecaId + '/ListaLibri').get().then((snapshot) => {
      snapshot.forEach((doc)=>{
        console.log(doc.get('titolo'));
        //this.listaLibri = doc.data();
      });
    });*/
    /*return Observable.fromPromise(firebase.firestore().collection('Biblioteche/'
    + bibliotecaId + '/ListaLibri').get().then((snapshot) => {
      snapshot.forEach((doc)=>{
        console.log(doc.get('titolo'));
        //this.listaLibri = doc.data();
      });
    }));*/
    //return this.firestore.collection('Biblioteche').doc<Biblioteca>(bibliotecaId).valueChanges('ListaLibri_libro2');

    //return this.listaLibri;
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



}
