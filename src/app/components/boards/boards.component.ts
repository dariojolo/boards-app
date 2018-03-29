import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { HeaderComponent } from '../header/header.component';
import { Ciudad } from 'app/components/models/ciudad'
import { Board } from 'app/components/models/board'
import { BoardService } from 'app/services/board.service'
import swal from 'sweetalert2'

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
  test:string;

  constructor(private activatedRoute: ActivatedRoute,
    private boardService: BoardService) {
    //console.log(activatedRoute.params);
    this.activatedRoute.params.subscribe(params => {
      this.usuario = params['usuario'];
      this.test = this.usuario;
      console.log("En constructor: " + this.usuario);
      boardService.nombre = this.usuario;
      boardService.usuario = this.usuario;
      console.log("Board service usuario: " + boardService.usuario);
    });
  }
  ngOnInit() {
    console.log("En ngOnInit");
    this.boardService.getBoards(this.usuario).subscribe(
      board => {
        if (board !== null){
        console.log("Suscribiendo boards: " + board.nombre);
        this.board = board;
        this.boardService.board = board;
        this.boardService.getCiudades(board.nombre).subscribe(
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
      });
      if (this.board === undefined){
        console.log("Board undefined");
        this.boardIndefinido = true;
        console.log("boardIndefinido: " + this.boardIndefinido);
      }
  }
    borrarCiudad(ciudad: Ciudad): void{
      swal({
  title: 'Esta seguro?',
  text: `¿Seguro desea eliminar la ciudad: ${ciudad.nombre}?`,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Sí, eliminar!',
  cancelButtonText: 'No, cancelar!',
  confirmButtonClass: 'btn btn-success',
  cancelButtonClass: 'btn btn-danger',
  buttonsStyling: false,
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    this.boardService.borrarCiudad(ciudad.id).subscribe(
      respuesta => {
        this.cities = this.cities.filter(ciu => ciu !== ciudad)
        swal(
          'Ciudad eliminada!',
          `Ciudad ${ciudad.nombre} eliminada con éxito`,
          'success'
        )
      }
    )
      }
})
    }

}
