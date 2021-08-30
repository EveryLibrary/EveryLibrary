import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController, ToastController} from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Libro} from '../../models/libri.interface';
import {Biblioteca} from '../../models/biblioteche.interface';
import {count} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  validationFormRicerca ={
    ricerca:[
      {type:'required', message:'Inserisci il nome della biblioteca'},
    ]
  };
  ricercaBiblioteca: FormGroup;
  private db = firebase.firestore();
  constructor(private router: Router, public authservice: AuthService, private firestore: AngularFirestore,
  public toastController: ToastController, private navController: NavController, public formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.ricercaBiblioteca=this.formBuilder.group({
      ricerca: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    //console.log(firebase.auth().currentUser.uid);
  }

  linkMappaBiblioteche(){
    this.router.navigate(['/biblioteche']);
  }

  linkAreaRiservata(){
    if(this.userLoggedIn()){
    this.router.navigate(['/area-riservata']);}
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
      message: mex,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  async ricerca(value) {
    let counter = 0;
    try {
      this.firestore.collection('Biblioteche',
        ref => ref.where('nome', '==', value.ricerca)
      ).get()
        .subscribe(
          snaps => {
            snaps.forEach(
              snap => {
                console.log(snap.data());
                this.navController.navigateForward(['biblioteca/', snap.id]);
              }
            );
          }
        );
      if (counter === 0) {await this.presentToast('Nessuna biblioteca trovata!');}
    } catch (err) {
      console.log(err);
    }
  }

}
