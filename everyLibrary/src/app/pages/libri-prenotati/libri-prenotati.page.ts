import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FirestoreService} from '../../services/data/firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {first} from 'rxjs/operators';
import firebase from 'firebase';

@Component({
  selector: 'app-libri-prenotati',
  templateUrl: './libri-prenotati.page.html',
  styleUrls: ['./libri-prenotati.page.scss'],
})
export class LibriPrenotatiPage implements OnInit {
  public libriList: any[];
  public libriCaricati: any[];
  
  constructor(private navController: NavController, private router: Router,
              private firestoreService: FirestoreService, private route: ActivatedRoute,
              public authservice: AuthService, private firestore: AngularFirestore) { }

  async ngOnInit() {
    const userId = firebase.auth().currentUser.uid;
    this.libriList = await this.initializeItems(userId);
  }
  async initializeItems(userId): Promise<any> {
    const libriList = await this.firestoreService.getLibriPrestatiList(userId);
    this.libriCaricati = libriList;
    return libriList;
  }

  async filterList(evt){
    this.libriList = this.libriCaricati;
    const searchTerm = evt.srcElement.value;
    if(!searchTerm){
      return;
    }

    this.libriList = this.libriList.filter(
      currentLibro => {
        if(currentLibro.titolo && searchTerm){
          if(currentLibro.titolo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            return true;
          }
          return false;
        }
      }
    );
  }
  login(){
    this.router.navigate(['/login']);
  }
  userLoggedIn() {
    return (firebase.auth().currentUser != null);
  }
}
