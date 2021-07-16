import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.page.html',
  styleUrls: ['./area-riservata.page.scss'],
})
export class AreaRiservataPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }

  linkLibriPreferiti(){
    this.router.navigate(['/libri-preferiti']);
  }
  linkLibriPrenotati(){
    this.router.navigate(['/libri-prenotati']);
  }
}
