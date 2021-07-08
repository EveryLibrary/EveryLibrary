import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-biblioteche',
  templateUrl: './biblioteche.page.html',
  styleUrls: ['./biblioteche.page.scss'],
})
export class BibliotechePage implements OnInit {

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

}
