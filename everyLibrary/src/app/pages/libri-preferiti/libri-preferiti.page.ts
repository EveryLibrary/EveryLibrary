import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';
import {FirestoreService} from '../../services/data/firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Libro} from '../../models/libri.interface';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import firestore = firebase.firestore;

@Component({
  selector: 'app-libri-preferiti',
  templateUrl: './libri-preferiti.page.html',
  styleUrls: ['./libri-preferiti.page.scss'],
})
export class LibriPreferitiPage implements OnInit {
  public libriList: any[];
  private libriCaricati: any[];
  constructor(private navController: NavController, private router: Router,
              private firestoreService: FirestoreService, private route: ActivatedRoute,
              public authservice: AuthService, public firestore: AngularFirestore) {}
  async ngOnInit() {
    const utenteId = firebase.auth().currentUser.uid;
    this.libriList = await this.initializeItems(utenteId);
  }

  async initializeItems(utenteId: any) {
    const libriPreferitiList = await this.firestoreService.getLibriPreferitiList(utenteId).pipe(first()).toPromise();
    this.libriCaricati = libriPreferitiList;
    return libriPreferitiList;
  }
}
