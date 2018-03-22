import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";




@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent {

usuario:string;


  constructor(private activatedRoute:ActivatedRoute) {
     //console.log(activatedRoute.params);
     this.activatedRoute.params.subscribe( params => {
     this.usuario =  params['usuario'];
    });
  }
}
