import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

export interface UserID{
  username: string;
  uid: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: UserID;

  constructor(public auth: AngularFireAuth) { }


  loginFireauth(value){
    return new Promise<any>( (resolve, reject)=>{
      firebase.auth().signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        error => reject(error)
      );
      });
  }

  setUser(user: UserID){
    return this.user = user;
  }

  getUserUid():string{
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
}
