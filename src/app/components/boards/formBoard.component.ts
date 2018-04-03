import { Component, OnInit } from '@angular/core';
import { Board } from 'app/components/models/board'
import { BoardService} from 'app/services/board.service'
import { Router,ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2'
@Component({
  selector: 'app-formBoard',
  templateUrl: './formBoard.component.html'
})
export class FormBoardComponent implements OnInit {

 private board:Board = new Board();
 private titulo: string = "Agregar board";

  constructor(private boardService: BoardService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {
    console.log("Nombre: " + boardService.nombre);
      }

  ngOnInit() {
    this.cargarBoard();
    console.log("Board cargado: " + this.board.nombre);
  }

  cargarBoard():void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        console.log("Board ID: " + id);
        if (id){
          this.boardService.getBoards(id).subscribe(
            board => {
              board.forEach(
                b => {
                  this.board = b;
                  this.titulo = "Editar board";
                }
              )
            });
        }
      })
  }
  public crear():void{
    console.log("clickeado");
    console.log(this.board);
    this.board.usuario = this.boardService.usuario;
    this.boardService.agregarBoard(this.board).subscribe(
      board => {
          this.titulo = "Agregar board";
          this.router.navigate(['/boards',this.boardService.usuario])
          swal('Board agregado', `Board ${board.nombre} agregado con exito!`,'success' )
      }
    );
  }
  public actualizar():void{
    console.log("Actualizar board: " + this.board.nombre);
    this.boardService.actualizarBoard(this.board)
      .subscribe( board => {
        console.log("Board resultado: " + board.nombre);
        this.boardService.board = board;
        this.router.navigate(['/boards',this.boardService.usuario])
        swal('Board actualizada', `Board ${board.nombre} actualizado con exito!`,'success' )
      })
  };
}
