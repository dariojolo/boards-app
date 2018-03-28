import { Component, OnInit } from '@angular/core';
import { Board } from 'app/components/models/board'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

 private board:Board = new Board();
 private titulo: string = "Crear board";

  constructor() { }

  ngOnInit() {
  }
  public crear():void{
    console.log("clickeado");
    console.log(this.board);
  }
}
