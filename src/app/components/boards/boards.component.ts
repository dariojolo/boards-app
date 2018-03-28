import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { HeaderComponent } from '../header/header.component';
import { Ciudad } from 'app/components/models/ciudad'
import { Board } from 'app/components/models/board'

import { BoardService} from 'app/services/board.service'





@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit{
usuario:string;
boards:Board[];
cities:Ciudad[];

  constructor(private activatedRoute:ActivatedRoute,
              private boardService:BoardService) {
     //console.log(activatedRoute.params);
     this.activatedRoute.params.subscribe( params => {
     this.usuario =  params['usuario'];
    });
  }
  ngOnInit() {
  console.log("En ngOnInit");
    this.boardService.getBoards().subscribe(
      boards => {
         this.boards = boards;
       });
    console.log("En ngOnInit 2");
  }
  mostrarCiudades(usuario:string){
    console.log("mostrar ciudades del usuario: " + usuario);
    this.boards.forEach (board =>
      {
        console.log("DENTRO DEL BOARD: " + board["nombre"]);
        if (board.usuario == usuario){
          console.log("DENTRO DEL BOARD: " + board["nombre"] + " Con el usuario: " + board['usuario']);
          console.log("Ciudad?? " + board.ciudades[4].nombre);
          this.cities= board['ciudades'];
          //console.log("Largo: " + ciudades[3].nombre);

          /*board['ciudades'].forEach(ciudad =>{
            console.log(ciudad.nombre);
          }); */
          }
        });
     }
}
