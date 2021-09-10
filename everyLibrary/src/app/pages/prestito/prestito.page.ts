import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Libro, LibroPrestato} from '../../models/libri.interface';
import {Biblioteca} from '../../models/biblioteche.interface';
import {FirestoreService} from '../../services/data/firestore.service';
import firebase from 'firebase';

@Component({
  selector: 'app-prestito',
  templateUrl: './prestito.page.html',
  styleUrls: ['./prestito.page.scss'],
})
export class PrestitoPage implements OnInit {
  today = Date.now().toString();
  public libro: Libro;
  public biblioteca: Biblioteca;
  ciccio: string;
  prestito: boolean;
  dataRitiro = Date.toString().split('T')[0];
  constructor(private navController: NavController, private router: Router,
              private route: ActivatedRoute, private firestoreService: FirestoreService,
              public authservice: AuthService, public toastController: ToastController) { }

  ngOnInit() {
    const libroId: string = this.route.snapshot.paramMap.get('id');
    const bibliotecaId: string = this.route.snapshot.paramMap.get('idBiblioteca');
    this.firestoreService.getLibro(libroId).subscribe(libro => {
      this.libro = libro;
    });
    this.firestoreService.getBiblioteca(bibliotecaId).subscribe(biblioteca => {
      this.biblioteca = biblioteca;
    });
    this.libroPrestato();
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
  prestato(cond) {
    if (this.userLoggedIn()) {
      switch (cond){
        case false:
          this.ciccio = 'Conferma prenotazione';
          this.firestoreService.aggiungiPrestito(firebase.auth().currentUser.uid,
            this.route.snapshot.paramMap.get('id'), this.route.snapshot.paramMap.get('idBiblioteca'),
            this.today, this.dataRitiro);
          this.prestito = true;
          this.router.navigate(['/libri-prenotati']);
          break;
        case true:
          this.ciccio = 'Preso in prestito';
          this.prestito = false;
          break;
      }
      setTimeout(() => {
        console.log('Async operation has ended');
      }, 1000);
    }
    else {
      this.presentToast('Devi effettuare il Login!').then( res=>
          this.router.navigate(['/login']),
        err => console.log(err)
      );
    }
  }
  libroPrestato() {
    if (this.userLoggedIn()) {
      this.firestoreService.verificaPrestito(firebase.auth().currentUser.uid, this.route.snapshot.paramMap.get('id'))
        .then(value => {
          this.prestito = value;
          if (this.prestito) {this.ciccio = 'Preso in prestito';}
          else {this.ciccio = 'Conferma prenotazione';}
          return ;
        });
    } else {
      this.prestito = false;
      this.ciccio = 'Conferma prenotazione';
      return ;
    }
  }
  userLoggedIn() {
    return (firebase.auth().currentUser != null);
  }
}
