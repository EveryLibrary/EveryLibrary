import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import { Libro } from '../../models/libri.interface';

@Component({
  selector: 'app-lista-libri',
  templateUrl: './lista-libri.page.html',
  styleUrls: ['./lista-libri.page.scss'],
})
export class ListaLibriPage implements OnInit {
  //public libri: Libro[];
  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }

  linkLibro(){
    this.router.navigate(['/libro']);
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
