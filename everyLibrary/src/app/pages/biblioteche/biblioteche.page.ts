import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-biblioteche',
  templateUrl: './biblioteche.page.html',
  styleUrls: ['./biblioteche.page.scss'],
})
export class BibliotechePage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }

  linkBiblioteca(){
    this.router.navigate(['/biblioteca']);
  }

  /*
  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }
   */
}
