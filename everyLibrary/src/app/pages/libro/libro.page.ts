import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.page.html',
  styleUrls: ['./libro.page.scss'],
})
export class LibroPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }
  linkPrestito(){
    this.router.navigate(['/prestito']);
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
