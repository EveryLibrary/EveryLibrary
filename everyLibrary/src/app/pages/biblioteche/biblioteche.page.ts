import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';

declare let google: any;

@Component({
  selector: 'app-biblioteche',
  templateUrl: './biblioteche.page.html',
  styleUrls: ['./biblioteche.page.scss'],
})
export class BibliotechePage implements OnInit {

  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
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
  ionViewDidEnter(){
    this.showMap();
  }
  showMap(){
    const location = new google.maps.LatLng(-17.824858,31.053028);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }
}
