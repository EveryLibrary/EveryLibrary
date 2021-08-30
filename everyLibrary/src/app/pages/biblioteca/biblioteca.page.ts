import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Biblioteca } from '../../models/biblioteche.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  validationFormRicerca ={
    ricerca:[
      {type:'required', message:'Inserisci il titolo del Libro'},
    ],
  };
  ricercaLibro: FormGroup;
  public biblioteca: Biblioteca;
  constructor(private navController: NavController, private router: Router, private firestore: AngularFirestore,
    private route: ActivatedRoute, private firestoreService: FirestoreService, public authservice: AuthService,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    const bibliotecaId: string =  this.route.snapshot.paramMap.get('id');
    this.firestoreService.getBiblioteca(bibliotecaId).subscribe(biblioteca => {
      this.biblioteca = biblioteca;
    });
    this.ricercaLibro=this.formBuilder.group({
      ricerca: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }
  linkListaLibri(){
    this.router.navigate(['/lista-libri',  this.route.snapshot.paramMap.get('id')]);
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

  ricerca(value: any) {
    try  {
      this.firestore.collection('Biblioteche/'+ this.route.snapshot.paramMap.get('id') + '/ListaLibri',
        ref => ref.where('titolo', '==', value.ricerca)
      ).get()
        .subscribe(
          snaps => {
            snaps.forEach(
              snap=>{
                console.log(snap.data());
                console.log(snap.get('titolo'));
                this.navController.navigateForward(['libro/', snap.get('id')]);
              }
            );
          }
        );
    } catch (err) {
      console.log(err);
    }
  }
}
