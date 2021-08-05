import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Biblioteca } from '../../models/biblioteche.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  public biblioteca: Biblioteca;
  constructor(private navController: NavController, private router: Router,
    private route: ActivatedRoute, private firestoreService: FirestoreService) { }

  ngOnInit() {
    const bibliotecaId: string =  this.route.snapshot.paramMap.get('id');
    this.firestoreService.getBiblioteca(bibliotecaId).subscribe(biblioteca => {
      this.biblioteca = biblioteca;
    });
  }
  linkListaLibri(){
    this.router.navigate(['/lista-libri',  this.route.snapshot.paramMap.get('id')]);
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
}
