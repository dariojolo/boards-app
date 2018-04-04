import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'app/components/models/ciudad'
import { Board } from 'app/components/models/board'
import { BoardService} from 'app/services/board.service'
import { Router,ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2'
@Component({
  selector: 'app-formCiudad',
  templateUrl: './formCiudad.component.html'
})
export class FormCiudadComponent implements OnInit {

 private ciudad:Ciudad = new Ciudad();
 private titulo: string = "Agregar ciudad";
 private board:Board;

  constructor(private boardService: BoardService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {
      }

  ngOnInit() {
    this.cargarCiudad();
    console.log("Ciudad cargada: " + this.ciudad.nombre);
  }

  cargarCiudad():void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        let b = params['board'];
        console.log("Ciudad ID: " + id + "Board: " + b);
        if (id){
          this.boardService.getCiudad(id).subscribe(
            ciudad => {
              this.ciudad = ciudad;
              this.titulo = "Editar ciudad";
            });
        }
      })
  }
  public crear():void{
    console.log("clickeado");
    console.log(this.ciudad);
    console.log("Board");
    this.ciudad.board = this.boardService.boardActual;

    this.boardService.agregarCiudad(this.ciudad).subscribe(
      ciudad => {
          this.titulo = "Agregar ciudad";
          this.router.navigate(['/boards',this.boardService.usuario])
          swal('Ciudad agregada', `Ciudad ${ciudad.nombre} agregada con exito!`,'success' )
      }
    );
  }
  public actualizar():void{
    this.boardService.actualizarCiudad(this.ciudad)
      .subscribe( ciudad => {
        this.router.navigate(['/boards',this.boardService.usuario])
        swal('Ciudad actualizada', `Ciudad ${ciudad.nombre} actualizada con exito!`,'success' )
      })
  };
}
