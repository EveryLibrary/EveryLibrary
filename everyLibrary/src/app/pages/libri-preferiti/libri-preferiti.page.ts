import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-libri-preferiti',
  templateUrl: './libri-preferiti.page.html',
  styleUrls: ['./libri-preferiti.page.scss'],
})
export class LibriPreferitiPage implements OnInit {

  constructor(private navController: NavController, private router: Router, public authservice: AuthService) { }

  ngOnInit() {
  }

}
