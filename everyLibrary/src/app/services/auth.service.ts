import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import {LoadingController} from "@ionic/angular";

export interface UserID{
  username: string;
  uid: string;
}

export interface UserSignUp{
  uid: string;
  name: string;
  surname: string;
  birthdate: string;
  phoneNumber: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loading: any;
  private user: UserSignUp;

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore,
              public router: Router, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl;
  }


  loginFireauth(value){
    return new Promise<any>( (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      );
      });
  }

  /*userLogIn(id: string, uid: string){

    return this.firestore.doc(`Utenti/${id}`).update({
      id: uid,
    });
  }*/

  setUser(user: UserSignUp){
    return this.user = user;
  }

  getUserUid(): string{
    return this.user.uid;
  }

  userRegistration(value){
    return new Promise<any>((resolve,reject) =>{
      firebase.auth().createUserWithEmailAndPassword(value.email,value.password).then(
        res => resolve(res),
        error => reject(error)
      );
    });
  }

  userSignUp(name,surname,birthdate,phoneNumber, email): Promise<void> {
    //const id = this.firestore.createId();
    const id = firebase.auth().currentUser.uid;

    return this.firestore.doc(`Utenti/${id}`).set({
      id,
      name,
      surname,
      birthdate,
      phoneNumber,
      email,
    });
  }

  getUserInfo(userId: string): Observable<UserSignUp> {
    return this.firestore.collection('Utenti').doc<UserSignUp>(userId).valueChanges();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async SignOut() {
    var load = await this.loadingCtrl.create({
      message: 'Attendere prego....',
      duration: 100,
    });
    load.present();
    firebase.auth().signOut().then(
      r => {
        console.log('Sign out');
        this.loading.dismiss();
        this.router.navigate(['dashboard']);
      },
      err => console.log(err)
    );
  }
}
