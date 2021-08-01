import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Biblioteca } from '../../models/biblioteche.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';

declare let google: any;

@Component({
  selector: 'app-biblioteche',
  templateUrl: './biblioteche.page.html',
  styleUrls: ['./biblioteche.page.scss'],
})
export class BibliotechePage implements OnInit {
  public bibliotecheList: Observable<Biblioteca[]>;
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  constructor(private navController: NavController, private router: Router,
  private firestoreService: FirestoreService) { }

  ngOnInit() {
    this.bibliotecheList = this.firestoreService.getBibliotecheList();
  }

  linkBiblioteca(){
    this.router.navigate(['/biblioteca']);
  }
  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }
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
  userLoggedIn() {
    return (firebase.auth().currentUser != null);
  }
}
