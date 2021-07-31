import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

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

  private user: UserSignUp;

  constructor(public auth: AngularFireAuth, public firestore: AngularFirestore) { }


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
}
