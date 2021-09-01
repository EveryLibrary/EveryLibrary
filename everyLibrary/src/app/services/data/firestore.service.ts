import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';
import {Biblioteca} from '../../models/biblioteche.interface';
import {Observable} from 'rxjs';
import {Libro, LibroPreferito} from '../../models/libri.interface';
import firebase from 'firebase';
import {count} from 'rxjs/operators';

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

  getLibriPreferitiList(uid: string) {
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
    return this.firestore.collection<Libro>(`LibriPreferiti`, ref => ref.where('userId','==',uid))
      .valueChanges();
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

  async verificaPreferito(userUid: string, id: string){
    console.log('Metodo verificaPreferito:');
    let cond: boolean;
    //let list = this.firestore.collection('LibriPreferiti', ref => ref.where('userId', '==', userUid))
    //  .get();
    // per fare la query corretta va aggiunto un altro .where(userID == userUid) dopo il primo e
    // vanno indicizzati su firebase se non funziona
     await this.db.collection('LibriPreferiti').where('libroId', '==', id)
       .get()
       .then((doc) => {
      if (doc.size !== 0) {
        console.log(doc.docs);
        console.log('libro preferito');
        console.log('Document data:', doc.size);
        //return Promise.resolve(true);
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
/*ngOnInit() {
  var libri = this.database.collection("utente", ref => ref.where('uid','==',this.id));
  docRef.get().toPromise().then((querySnapshot) => {
    querySnapshot.forEach( (doc) => {
      this.SchedeProfilo = this.database.collection<Schede>("scheda", ref =>
       ref.where('creatore', '==', doc.data()['username']).where('genere','==',this.cat)).valueChanges();
      this.SchedeProfilo.subscribe(result => {
        if(result.length == 0)
          this.openToast();
      });
    });
  });
}*/
