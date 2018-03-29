import { Injectable } from '@angular/core';
//import { BOARDS } from '../components/boards/boards.json'
import { Board } from 'app/components/models/board'
import { Ciudad } from 'app/components/models/ciudad'
import { Observable } from 'rxjs/Observable'

import { HttpClient } from '@angular/common/http'

@Injectable()
export class BoardService {

nombre:string;

  constructor( private http:HttpClient) { }

  getBoards(usuario: string): Observable<Board>{
    return this.http.get<Board>('http://localhost:8080/api/boards/nombre/'+usuario);
  }

  getCiudades(nombre:string):Observable<Ciudad[]>{
    //return of(BOARDS);
    console.log("Nombre recibido " + nombre);
    this.nombre = nombre;
    console.log("Nombre pasado " + this.nombre);
    return this.http.get<Ciudad[]>('http://localhost:8080/api/boards/ciudades/'+this.nombre);

  }
}
