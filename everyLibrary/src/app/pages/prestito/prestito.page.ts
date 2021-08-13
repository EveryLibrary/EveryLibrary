import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-prestito',
  templateUrl: './prestito.page.html',
  styleUrls: ['./prestito.page.scss'],
})
export class PrestitoPage implements OnInit {

  constructor(private navController: NavController, private router: Router,
              public authservice: AuthService) { }

  ngOnInit() {
  }
}
