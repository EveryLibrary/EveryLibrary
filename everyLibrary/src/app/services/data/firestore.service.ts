import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';
import {Biblioteca} from '../../models/biblioteche.interface';
import {Observable} from 'rxjs';
import {Libro} from '../../models/libri.interface';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private listaLibri: Observable<Libro[]>;
  private db = firebase.firestore();

  constructor(public firestore: AngularFirestore) { }

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
    return this.firestore.collection<Libro>(`Libri`).doc<Libro>(libroId).valueChanges();
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
      });*/
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
  getListaLibriBiblioteca(bibliotecaId: string): Observable<Libro[]> {
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
    /*return Observable.fromPromise(firebase.firestore().collection('Biblioteche/' + bibliotecaId + '/ListaLibri').get().then((snapshot) => {
      snapshot.forEach((doc)=>{
        console.log(doc.get('titolo'));
        //this.listaLibri = doc.data();
      });
    }));*/
    //return this.firestore.collection('Biblioteche').doc<Biblioteca>(bibliotecaId).valueChanges('ListaLibri_libro2');

    //return this.listaLibri;
    return this.firestore.collection<Libro>('Biblioteche/' + bibliotecaId + '/ListaLibri').valueChanges();
  }
}
/*ngOnInit() {
  var libri = this.database.collection("utente", ref => ref.where('uid','==',this.id));
  docRef.get().toPromise().then((querySnapshot) => {
    querySnapshot.forEach( (doc) => {
      this.SchedeProfilo = this.database.collection<Schede>("scheda", ref => ref.where('creatore', '==', doc.data()['username']).where('genere','==',this.cat)).valueChanges();
      this.SchedeProfilo.subscribe(result => {
        if(result.length == 0)
          this.openToast();
      });
    });
  });
}*/
