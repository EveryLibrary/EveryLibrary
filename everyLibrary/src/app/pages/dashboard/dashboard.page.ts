import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  jsonData: any=[];
  constructor(private router: Router, public authservice: AuthService, private firestore: AngularFirestore,
  public toastController: ToastController, private navController: NavController) {
    this.initializeJSONData();
  }
  filterJSONData(ev: any){
    this.initializeJSONData();
    const val = ev.target.value;
    if(val && val.trim() !== ''){
      this.jsonData = this.jsonData.filter((item) =>(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ));
    }
  }
  ngOnInit() {
    //console.log(firebase.auth().currentUser.uid);
  }

  linkMappaBiblioteche(){
    this.router.navigate(['/biblioteche']);
  }

  linkAreaRiservata(){
    if(this.userLoggedIn()){
    this.router.navigate(['/area-riservata']);}
    else {
      this.presentToast().then( res=>
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
  initializeJSONData(){
    this.jsonData = [
      {
        name : 'L\'Aquila',
        code : 'AQ'
      },
      {
        name : 'Roma',
        code : 'RM'
      }
    ];
  }

  userLoggedIn() {
    return (firebase.auth().currentUser != null);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Devi effettuare il Login!',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }
}
