import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Libro } from '../../models/libri.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import {AuthService} from '../../services/auth.service';
import {Biblioteca} from '../../models/biblioteche.interface';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.page.html',
  styleUrls: ['./libro.page.scss'],
})

export class LibroPage implements OnInit {
  isFavorited: boolean;
  public libro: Libro;
  pippo: string;
  biblioteca: Biblioteca;
  constructor(private navController: NavController, private router: Router,
              private route: ActivatedRoute, private firestoreService: FirestoreService,
              public authservice: AuthService, public toastController: ToastController) { }

  async ngOnInit() {
    const libroId: string = this.route.snapshot.paramMap.get('id');
    const bibliotecaId: string =  this.route.snapshot.paramMap.get('idBiblioteca');
    this.firestoreService.getLibro(libroId).subscribe(libro => {
      this.libro = libro;
    });
    this.firestoreService.getBiblioteca(bibliotecaId).subscribe(biblioteca => {
      this.biblioteca = biblioteca;
    });
    this.favoriteBook();
  }
  favorite(cond) {
    //this.authservice.getUserUid()
      if (this.userLoggedIn()) {
        switch (cond){
          case false:
            this.presentToast('Libro aggiunto ai preferiti!');
            this.pippo = 'Rimuovi dai preferiti';
            //aggiungo il preferito chiamando il metodo e passandogli l'uid dell'utente collegato e l'id del libro preferito
            this.firestoreService.aggiungiPreferito(firebase.auth().currentUser.uid, this.route.snapshot.paramMap.get('id'));
            this.isFavorited = true;
            break;
          case true:
            this.presentToast('Libro rimosso dai preferiti!');
            this.pippo = 'Aggiungi ai preferiti';
            this.isFavorited = false;
            //aggiungo il preferito chiamando il metodo e passandogli l'uid dell'utente collegato e l'id del libro preferito
            this.firestoreService.rimuoviPreferito(firebase.auth().currentUser.uid, this.route.snapshot.paramMap.get('id'));
            break;
        }
        setTimeout(() => {
          console.log('Async operation has ended');
          //window.location.reload();
        }, 1000);
        //this.router.navigate(['/libro', this.route.snapshot.paramMap.get('id')]);
      }
    else {
      this.presentToast('Devi effettuare il Login!').then( res=>
          this.router.navigate(['/login']),
        err => console.log(err)
      );
    }
  }
  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }
  userLoggedIn() {
    return (firebase.auth().currentUser != null);
  }
  async presentToast(mex) {
    const toast = await this.toastController.create({
      message: '' + mex,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  favoriteBook() {
    if (this.userLoggedIn()) {
      console.log('Utente loggato');
      console.log(this.route.snapshot.paramMap);
      this.firestoreService.verificaPreferito(firebase.auth().currentUser.uid, this.route.snapshot.paramMap.get('id'))
        .then(value => {
          console.log('VALUE: ' + value);
          this.isFavorited = value;
          // parte html per visualizzare Rimuovi o Aggiungi in base alla preferenza del libro
              if (this.isFavorited) {this.pippo = 'Rimuovi dai preferiti';}
              else {this.pippo = 'Aggiungi ai preferiti';}
          console.log('is Favorited in favoriteBook: ' + this.isFavorited);
          return ;
        });
    } else {
      this.isFavorited = false;
      this.pippo = 'Aggiungi ai preferiti';
      console.log('Utente non loggato');
      return ;
    }
  }
}
