import {AfterContentInit, Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Biblioteca } from '../../models/biblioteche.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import {AuthService} from '../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
//declare var google;
declare var google: any;

@Component({
  selector: 'app-biblioteche',
  templateUrl: './biblioteche.page.html',
  styleUrls: ['./biblioteche.page.scss'],
})
export class BibliotechePage implements OnInit{ //, AfterContentInit
  public bibliotecheList: any[];
  public bibliotecheCaricate: any[];
  /*map;
  @ViewChild('mapElement') mapElement;*/
  /* MAPPA 1 */
   map: any;
  @ViewChild('mapElement', {read: ElementRef, static: false}) mapRef: ElementRef;
  constructor(private navController: NavController, private router: Router,
  private firestoreService: FirestoreService, public authservice: AuthService,
  private firestore: AngularFirestore) { }

  async ngOnInit() {
    /*this.firestoreService.getBibliotecheList().subscribe(
      bibliotecheList=>{
        this.bibliotecheList = bibliotecheList;
        this.bibliotecheCaricate = bibliotecheList;
      }
    );*/
    this.bibliotecheList = await this.initializeItems();
  }

  async initializeItems(): Promise<any> {
    const bibliotecheList = await this.firestoreService.getBibliotecheList().pipe(first()).toPromise();
    this.bibliotecheCaricate = bibliotecheList;
    return bibliotecheList;
  }

  async filterList(evt){
    this.bibliotecheList = this.bibliotecheCaricate;
    const searchTerm = evt.srcElement.value;
    
    if(!searchTerm){
      return;
    }
    
    this.bibliotecheList = this.bibliotecheList.filter(
      currentBiblioteca => {
        if(currentBiblioteca.nome && searchTerm){
          if(currentBiblioteca.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentBiblioteca.citta.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            return true;
          }
          return false;
        }
      }
    );
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
