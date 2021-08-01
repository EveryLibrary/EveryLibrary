import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Libri } from '../../models/libri.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Component({
  selector: 'app-lista-libri',
  templateUrl: './lista-libri.page.html',
  styleUrls: ['./lista-libri.page.scss'],
})
export class ListaLibriPage implements OnInit {
  public libriList: Observable<Libri[]>;
  constructor(private navController: NavController, private router: Router,
              private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.libriList = this.firestoreService.getLibriList();
  }

  linkLibro(){
    this.router.navigate(['/libro']);
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
