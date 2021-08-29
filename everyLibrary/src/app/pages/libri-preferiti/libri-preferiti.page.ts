import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {first} from 'rxjs/operators';
import {FirestoreService} from '../../services/data/firestore.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-libri-preferiti',
  templateUrl: './libri-preferiti.page.html',
  styleUrls: ['./libri-preferiti.page.scss'],
})
export class LibriPreferitiPage implements OnInit {
  public libriList: any[];
  public libriCaricati: any[];
  constructor(private navController: NavController, private router: Router,
              private firestoreService: FirestoreService, private route: ActivatedRoute,
              public authservice: AuthService, private firestore: AngularFirestore) {}
  async ngOnInit() {
    const bibliotecaId: string =  this.route.snapshot.paramMap.get('id');
    this.libriList = await this.initializeItems(bibliotecaId);
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
        if(currentLibro.titolo && searchTerm){
          if(currentLibro.titolo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
            return true;
          }
          return false;
        }
      }
    );
  }
}
