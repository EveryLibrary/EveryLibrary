import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lista-libri',
  templateUrl: './lista-libri.page.html',
  styleUrls: ['./lista-libri.page.scss'],
})
export class ListaLibriPage implements OnInit {

  constructor(private navController: NavController, private router: Router) { }

  ngOnInit() {
  }

  linkLibro(){
    //this.router.navigate('/libro');
  }
}
