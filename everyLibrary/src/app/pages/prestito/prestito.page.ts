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
  today = Date.now();
  public libro: Libro;
  public biblioteca: Biblioteca;
  constructor(private navController: NavController, private router: Router,
              private route: ActivatedRoute, private firestoreService: FirestoreService,
              public authservice: AuthService, public toastController: ToastController) { }

  ngOnInit() {
    const libroId: string = this.route.snapshot.paramMap.get('id');
    console.log(libroId);
    const bibliotecaId: string = this.route.snapshot.paramMap.get('idBiblioteca');
    this.firestoreService.getLibro(libroId,).subscribe(libro => {
      this.libro = libro;
    });
    this.firestoreService.getBiblioteca(bibliotecaId).subscribe(biblioteca => {
      this.biblioteca = biblioteca;
    });
  }

  confermaPrestito() {
    this.firestoreService.modificaPrestito(firebase.auth().currentUser.uid, this.route.snapshot.paramMap.get('id'), this.biblioteca.id);
    this.router.navigate(['/libri-prenotati']);
  }
}
