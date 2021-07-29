import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validationMessages ={
    name: [{type:'required', message:'Inserisci il nome'}],
    surname: [{type:'required', message:'Inserisci il cognome'}],
    phoneNumber: [{type:'required', message:'Inserisci il numero di telefono'}],
    birthdate: [{type:'required', message:'Inserisci la data di nascita'}],
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
  loading: any;
  constructor(private navController: NavController, private router: Router, public formBuilder: FormBuilder,
              public authService: AuthService, private alertCtrl: AlertController, public loadingCtrl: LoadingController) {
                this.loading = this.loadingCtrl;
  }

  ngOnInit() {
    this.validationFormUser=this.formBuilder.group(
      {
        name: new FormControl('' , Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$')
        ])),
        surname: new FormControl('' , Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z]+$')
        ])),
        birthdate: new FormControl('' , Validators.compose([
          Validators.required
        ])),
        phoneNumber: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(10)
        ])),
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

  registerUser(value){
    this.showalert();
    try{
      this.authService.userRegistration(value).then( response =>{
        console.log(response);
        if(response.user){
          response.user.updateProfile({
            displayName: value.name,
            surname: value.surname,
            birthdate: value.birthdate,
            email: value.email,
            phoneNumber: value.phoneNumber
          });
          //this.preference.store(value.phone,'userPhoneNumber');

          this.loading.dismiss();
          this.router.navigate(['login']);
        }
      }, error=>{
        this.loading.dismiss();
        this.errorLoading(error.message);

      });
    }catch(erro){
      console.log(erro);
    }
  }
  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header:'Errore nella registazione',
      message,
      buttons:[{
        text:'ok',
        handler: ()=>{
          this.navController.navigateBack(['signup']);
        }
      }]
    });
    await loading.present();
  }

  async showalert(){
    var load = await this.loadingCtrl.create({
      message:'Attendere prego....',
      duration:100,
    });
    load.present();
  }

}
