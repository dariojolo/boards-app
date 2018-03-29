import { Component, OnInit } from '@angular/core';
import { Board } from 'app/components/models/board'
import { BoardService} from 'app/services/board.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

 private board:Board = new Board();
 private titulo: string = "Crear board";

  constructor(private boardService:BoardService) {
    console.log(boardService.nombre);
      }

  ngOnInit() {
  }
  public crear():void{
    console.log("clickeado");
    console.log(this.board);
  }
}
