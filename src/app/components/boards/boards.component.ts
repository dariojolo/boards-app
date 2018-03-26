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
ciudades:Ciudad[] = [];
usuario:string;
ciudad1:Ciudad[];
boards:Board[];
resultado:String;

  constructor(private activatedRoute:ActivatedRoute,
              private boardService:BoardService) {
     //console.log(activatedRoute.params);
     this.activatedRoute.params.subscribe( params => {
     this.usuario =  params['usuario'];
    });
  }
  ngOnInit() {
//  console.log("En ngOnInit");
//    this.boardService.getBoards().subscribe(
    //  boards => this.boards = boards
    //  boards => this.resultado = boards
//    );
//  console.log("Resultado: " + this.resultado);
  }
  mostrarCiudades(usuario:string){
    console.log("mostrar ciudades del usuario: " + usuario);
    this.boards.forEach (board =>
      {
        console.log("Dentro de board: " + board);
         if (board.usuario == usuario){
           console.log("Dentro de usuario: " + usuario);
           console.log("Dentro de usuario - ciudades: " + board.ciudades);
           this.ciudades = board.ciudades;
          //  return board.ciudades;
         }
        })
        //  return null;
     };

  }
