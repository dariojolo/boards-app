import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { HeaderComponent } from '../header/header.component';
import { Ciudad } from 'app/components/models/ciudad'
import { Board } from 'app/components/models/board'




@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent {
ciudades:Ciudad[] = [];
usuario:string;
ciudad1:Ciudad[] = [
  {id:1,nombre:'Buenos Aires',temperatura:'22',fecha:'2018-03-23'},
  {id:2,nombre:'New York',temperatura:'26',fecha:'2018-04-27'},
]
boards:Board[] = [
  {id:1,nombre:'misCiudades',usuario:'dario',ciudades:this.ciudad1},
  {id:2,nombre:'lasCiudades',usuario:'pepe',ciudades:this.ciudad1},
  {id:3,nombre:'otrasCiudades',usuario:'dario1',ciudades:[{id:1,nombre:'Montevideo',temperatura:'16',fecha:'2018-01-03'}]}
];

  constructor(private activatedRoute:ActivatedRoute) {
     //console.log(activatedRoute.params);
     this.activatedRoute.params.subscribe( params => {
     this.usuario =  params['usuario'];
    });
  }
  mostrarCiudades(usuario:string):Ciudad[]{
    console.log("mostrar ciudades del usuario: " + usuario);
    this.boards.forEach (board =>
      {
         if (board.usuario == usuario){
           this.ciudades = board.ciudades;        
            return board.ciudades;
         }
        })
          return null;
     };

  }
