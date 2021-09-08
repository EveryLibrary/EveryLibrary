import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Libro } from '../../models/libri.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import { Biblioteca } from 'src/app/models/biblioteche.interface';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import { BibliotecaPage } from '../biblioteca/biblioteca.page';

@Component({
  selector: 'app-lista-libri',
  templateUrl: './lista-libri.page.html',
  styleUrls: ['./lista-libri.page.scss'],
})
export class ListaLibriPage implements OnInit {
  public libriList: any[];
  public libriCaricati: any[];
  public biblioteca = this.route.snapshot.paramMap.get('id');
  //public bid: string;
  constructor(private navController: NavController, private router: Router,
              private firestoreService: FirestoreService, private route: ActivatedRoute,
              public authservice: AuthService, private firestore: AngularFirestore) {}

  async ngOnInit() {
    const bibliotecaId: string =  this.route.snapshot.paramMap.get('id');
    //this.bid =  this.route.snapshot.paramMap.get('id');
    //console.log('Biblio: ' + bibliotecaId);
    //this.libriList = this.firestoreService.getListaLibriBiblioteca(bibliotecaId);
    //console.log('Lista libri: ' + this.libriList);
    this.libriList = await this.initializeItems(bibliotecaId);
  }

  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }
  userLoggedIn() {
    return (firebase.auth().currentUser != null);
  }
  async initializeItems(bibliotecaId): Promise<any> {
    const libriList = await this.firestoreService.getListaLibriBiblioteca(bibliotecaId).pipe(first()).toPromise();
    this.libriCaricati = libriList;
    return libriList;
  }

  async filterList(evt){
    this.libriList = this.libriCaricati;
    const searchTerm = evt.srcElement.value;
    if(!searchTerm){
      return;
    }

    this.libriList = this.libriList.filter(
      currentLibro => {
        if((currentLibro.titolo || currentLibro.autore || currentLibro.editore) && searchTerm){
          if((currentLibro.titolo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
            || (currentLibro.autore.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
            || (currentLibro.editore.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)){
            return true;
          }
          return false;
        }
      }
    );
  }
}
