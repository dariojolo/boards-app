import { Injectable } from '@angular/core';
//import { BOARDS } from '../components/boards/boards.json'
import { Board } from 'app/components/models/board'
import { Ciudad } from 'app/components/models/ciudad'
import { Observable } from 'rxjs/Observable'

import { HttpClient } from '@angular/common/http'

@Injectable()
export class BoardService {

nombre:string;
private urlEndPoint:string = 'http://localhost:8080/api/boards4'
//private urlEndPointCiudades:string = 

  constructor( private http:HttpClient) { }

  getBoards():Observable<Board[]>{
    //return of(BOARDS);

    return this.http.get<Board[]>(this.urlEndPoint);

  }
  getCiudades(nombre:string):Observable<Ciudad[]>{
    //return of(BOARDS);
    console.log("Nombre recibido " + nombre);
    this.nombre = nombre;
    console.log("Nombre pasado " + this.nombre);
    return this.http.get<Ciudad[]>('http://localhost:8080/api/boards2/ciudades/'+this.nombre);

  }
}
