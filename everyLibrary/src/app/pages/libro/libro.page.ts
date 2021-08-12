import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import { ViewChild, ElementRef} from '@angular/core';
import { FirestoreService } from '../../services/data/firestore.service';
import { Libro } from '../../models/libri.interface';
import { Observable } from 'rxjs';
import firebase from 'firebase';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.page.html',
  styleUrls: ['./libro.page.scss'],
})
export class LibroPage implements OnInit {
  public libro: Libro;
  constructor(private navController: NavController, private router: Router,
              private route: ActivatedRoute, private firestoreService: FirestoreService) { }

  ngOnInit() {
    const libroId: string =  this.route.snapshot.paramMap.get('id');
    console.log('Libro: ' + libroId);
    this.firestoreService.getLibro(libroId).subscribe(libro => {
      this.libro = libro;
    });
  }
  linkPrestito(){
    this.router.navigate(['/prestito']);
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
}
