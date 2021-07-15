import { Component, OnInit } from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
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
    tel: [{type:'required', message:'Inserisci il numero di telefono'}],
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
              public authService: AuthService, private alertCtrl: AlertController) { }

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
        tel: new FormControl('', Validators.compose([
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
    try {
      this.authService.userRegistration(value).then( resp=>{
        console.log(resp);
        if (resp.user){
          resp.updateProfile({
            displayName: value.name,
            email: value.email,
            birthdate: value.birthdate,
            surname: value.surname,
            tel: value.tel
          });
          this.loading.dismiss();
          this.router.navigate(['login']);
        }
      }, error=>{
        this.loading.dismiss();
        this.errorLoading(error.message);
      });
    } catch (err) {
      console.log(err);
    }
  }
  async errorLoading(message: any){
    const loading = await this.alertCtrl.create({
      header: 'Errore nella registazione',
      message: message,
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
    var load = await  this.alertCtrl.create({
      message:'Attendere prego....',
    });
    load.present();
  }

}
