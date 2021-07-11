import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationUserMessage ={
    username:[
      {type:"required", message:"Inserisci il tuo username"},
      {type:"pattern", message:"L'username inserito non è corretto"}
    ],
    password:[
      {type:"required", message:"Inserisci la tua password"},
      {type:"minlength", message:"La password inserita non è corretta"}
    ]
  }

  validationFormUser: FormGroup;

  constructor(private navController: NavController, private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validationFormUser=this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ]))
    });

  }

  signup(){
    this.router.navigate(['/signup']);
  }

}
