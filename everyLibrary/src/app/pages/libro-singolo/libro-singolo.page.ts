import { Component, OnInit } from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { FirestoreService } from '../../services/data/firestore.service';
import { Libro } from '../../models/libri.interface';
import firebase from 'firebase';
import {AuthService} from '../../services/auth.service';
import {Biblioteca} from '../../models/biblioteche.interface';

@Component({
  selector: 'app-libro-singolo',
  templateUrl: './libro-singolo.page.html',
  styleUrls: ['./libro-singolo.page.scss'],
})
export class LibroSingoloPage implements OnInit {
  public libro: Libro;
  constructor(private navController: NavController, private router: Router,
              private route: ActivatedRoute, private firestoreService: FirestoreService,
              public authservice: AuthService, public toastController: ToastController) { }

  async ngOnInit() {
    const libroId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getLibro(libroId).subscribe(libro => {
      this.libro = libro;
    });
  }
  userLoggedIn() {
    return (firebase.auth().currentUser != null);
  }
}
