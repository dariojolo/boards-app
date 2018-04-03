import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'app/components/models/ciudad'
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

  constructor(private boardService: BoardService,
              private router: Router,
              private activatedRoute:ActivatedRoute) {
    console.log("Nombre: " + boardService.nombre);
      }

  ngOnInit() {
    console.log("LLamar a yahoo");
    this.boardService.llamarYahoo().subscribe(
      resultado => {
        console.log("Resultado yahoo: " + resultado);
      });
    this.cargarCiudad();
    console.log("Ciudad cargada: " + this.ciudad.nombre);
  }

  cargarCiudad():void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        console.log("Ciudad ID: " + id);
        if (id){
          this.boardService.getCiudad(id).subscribe(
            ciudad => {
              this.ciudad = ciudad;
              console.log("Esta ciudad: " + this.ciudad.nombre);
              this.titulo = "Editar ciudad";
            });
        }
      })
  }
  public crear():void{
    console.log("clickeado");
    console.log(this.ciudad);
    this.ciudad.board = this.boardService.board;
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
