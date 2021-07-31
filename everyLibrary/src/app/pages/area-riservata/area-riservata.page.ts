import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, UserSignUp} from '../../services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.page.html',
  styleUrls: ['./area-riservata.page.scss'],
})
export class AreaRiservataPage implements OnInit {
  public utente: UserSignUp;
  constructor(private navController: NavController,
              private router: Router,
              public authservice: AuthService) { }

  ngOnInit() {
    /*const dbRef = firebase.database().ref();
    const userId = firebase.auth().currentUser.uid;
    dbRef.child('Utenti').child(userId).get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error(error);
    });*/
    const userId = firebase.auth().currentUser.uid;
    //const userId: string = this.route.snapshot.paramMap.get('id');
    this.authservice.getUserInfo(userId).subscribe(utente => {
      this.utente = utente;
    });
  }

  linkLibriPreferiti(){
    this.router.navigate(['/libri-preferiti']);
  }
  linkLibriPrenotati(){
    this.router.navigate(['/libri-prenotati']);
  }
}
