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

  board:Board = new Board();
  titulo: string = "Agregar board";

  constructor(private boardService: BoardService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {
      }

  ngOnInit() {
    this.cargarBoard();
  }

  cargarBoard():void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
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
    this.boardService.actualizarBoard(this.board)
      .subscribe( board => {
        this.boardService.board = board;
        this.router.navigate(['/boards',this.boardService.usuario])
        swal('Board actualizada', `Board ${board.nombre} actualizado con exito!`,'success' )
      })
  };
}
