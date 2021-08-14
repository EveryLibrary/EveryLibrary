import {AfterContentInit, Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Biblioteca } from '../../models/biblioteche.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import {AuthService} from '../../services/auth.service';
//declare var google;
declare var google: any;

@Component({
  selector: 'app-biblioteche',
  templateUrl: './biblioteche.page.html',
  styleUrls: ['./biblioteche.page.scss'],
})
export class BibliotechePage implements OnInit{ //, AfterContentInit
  public bibliotecheList: Observable<Biblioteca[]>;
  /*map;
  @ViewChild('mapElement') mapElement;*/
  /* MAPPA 1 */
   map: any;
  @ViewChild('mapElement', {read: ElementRef, static: false}) mapRef: ElementRef;
  constructor(private navController: NavController, private router: Router,
  private firestoreService: FirestoreService, public authservice: AuthService) { }

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

  /* MAPPA 1 */
  ionViewDidEnter(){
    this.showMap();
  }
  showMap(){
    const location = new google.maps.LatLng(42.349781,13.387519);
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

  /*ngAfterContentInit(): void {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
        {
          center: {lat: -34.397, lng:150.644},
          zoom: 8
        });
    }*/
}
