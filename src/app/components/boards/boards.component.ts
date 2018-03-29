import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { HeaderComponent } from '../header/header.component';
import { Ciudad } from 'app/components/models/ciudad'
import { Board } from 'app/components/models/board'

import { BoardService } from 'app/services/board.service'

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  usuario: string;
  boards: Board[];
  board: Board;
  cities: Ciudad[];
  mostrarTabla: boolean = false;
  boardIndefinido:boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private boardService: BoardService) {
    //console.log(activatedRoute.params);
    this.activatedRoute.params.subscribe(params => {
      this.usuario = params['usuario'];
      console.log("En constructor: " + this.usuario);
      boardService.nombre = this.usuario;
    });
  }
  ngOnInit() {
    console.log("En ngOnInit");
    this.boardService.getBoards(this.usuario).subscribe(
      board => {
        console.log("Suscribiendo boards: " + board.nombre);
        this.board = board;
      });
      if (this.board === undefined){
        console.log("Board undefined");
        this.boardIndefinido = true;
      }

    console.log("En ngOnInit 2" + this.board);
  }
  mostrarCiudades(usuario: string) {
    this.mostrarTabla = !this.mostrarTabla;
    console.log("mostrar ciudades del usuario: " + usuario);

    console.log("DENTRO DEL BOARD: " + this.board["nombre"]);
    if (this.board.usuario == usuario) {
      console.log("DENTRO DEL BOARD: " + this.board["nombre"] + " Con el usuario: " + this.board['usuario']);
      let nombre: string = this.board["nombre"];

      this.boardService.getCiudades(nombre).subscribe(
        ciudad => {
          console.log("Suscribiendo ciudades: " + ciudad.length);
          this.cities = ciudad;
          console.log("Cant: " + this.cities.length);
        }
      );
      this.cities.forEach(ciudad => {
        console.log(ciudad.nombre);
      });

    }

  }
}
