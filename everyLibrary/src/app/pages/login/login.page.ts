import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationUserMessage ={
    email:[
      {type:'required', message:'Inserisci la tua email'},
      {type:'pattern', message:'L\'email inserita non è corretta'}
    ],
    password:[
      {type:'required', message:'Inserisci la tua password'},
      {type:'minlength', message:'La password inserita non è corretta'}
    ]
  };

  validationFormUser: FormGroup;

  constructor(private navController: NavController, private router: Router, public formBuilder: FormBuilder,
              public authservice: AuthService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.validationFormUser=this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ]))
    });

  }

  loginUser(value){
    try {
      this.authservice.loginFireauth(value).then( resp=>{
        console.log(resp);
        //this.router.navigate(['area-riservata']);
        
        //controllare this.authservice.setUser
        if(resp.user){
          this.authservice.setUser({
            username: resp.user.displayName,
            uid: resp.user.uid
          })
          const userProfile = this.firestore.collection('profile').doc(resp.user.uid);
          userProfile.get().subscribe(result=>{
            if(result.exists){
              this.navController.navigateForward(['area-riservata']);
            } else {
              this.firestore.doc(`profile/${this.authservice.getUserUid()}`).set({
                name: resp.user.displayName,
                email: resp.user.email,
                //surname: resp.user.surname,
                //birthdate: resp.user.birthdate,
                phoneNumber: resp.user.phoneNumber
              });
              this.navController.navigateForward(['area-riservata']);
            }
          })
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  signup(){
    this.router.navigate(['/signup']);
  }

}
