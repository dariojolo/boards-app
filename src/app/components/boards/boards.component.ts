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
  ciudades: Ciudad[];
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
    });
    //this.boardService.nombre = this.nombre;
    this.boardService.usuario = this.usuario;
    this.board = this.boardService.board;
    console.log("Board service usuario: " + boardService.usuario);
    console.log("Board service nombre: " + boardService.nombre);



  }
  ngOnInit() {
    console.log("En ngOnInit Board Component");

    this.boardService.getBoard(this.usuario).subscribe(
      resultado => {
        if (resultado){
        this.board = resultado;
        this.boardService.board = resultado;
        console.log("Llamando a getCiudades: " + resultado.nombre);
        this.boardService.getCiudades(resultado.nombre).subscribe(
          ciudad => {
            this.ciudades = ciudad;
             console.log("Ciudades recibidas : " + ciudad.length);
                    }
                );
              }
            });
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
        this.ciudades = this.ciudades.filter(c => c !== ciudad)
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
