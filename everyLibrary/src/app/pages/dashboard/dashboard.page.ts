import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  jsonData: any=[];
  constructor(private router: Router) {
    this.initializeJSONData();
  }
  filterJSONData(ev: any){
    this.initializeJSONData();
    const val = ev.target.value;
    if(val && val.trim() !== ''){
      this.jsonData = this.jsonData.filter((item) =>(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ));
    }
  }
  ngOnInit() {
  }

  linkMappaBiblioteche(){
    this.router.navigate(['/biblioteche']);
  }

  linkAreaRiservata(){
    this.router.navigate(['/area-riservata']);
  }
  login(){
    this.router.navigate(['/login']);
  }

  signup(){
    this.router.navigate(['/signup']);
  }
  initializeJSONData(){
    this.jsonData = [
      {
        name : 'L\'Aquila',
        code : 'AQ'
      },
      {
        name : 'Roma',
        code : 'RM'
      }
    ];
  }
}
