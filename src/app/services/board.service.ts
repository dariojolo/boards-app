import { Injectable } from '@angular/core';
//import { BOARDS } from '../components/boards/boards.json'
import { Board } from 'app/components/models/board'
import { Ciudad } from 'app/components/models/ciudad'
import { Observable } from 'rxjs/Observable'

import { HttpClient ,HttpHeaders } from '@angular/common/http'

@Injectable()
export class BoardService {

urlCiudades:string='http://localhost:8080/api/boards/ciudades';
urlECiudades:string='http://localhost:8080/api/boards/Eciudades';
urlBoards:string='http://localhost:8080/api/boards/nombre';
board:Board;
usuario:string;

nombre:string;
private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor( private http:HttpClient) { }

  getBoards(usuario: string): Observable<Board>{
    return this.http.get<Board>(`${this.urlBoards}/${usuario}`);
  }

  getCiudades(nombre:string):Observable<Ciudad[]>{
    //return of(BOARDS);
    console.log("Nombre recibido " + nombre);
    this.nombre = nombre;
    console.log("Nombre pasado " + this.nombre);
    return this.http.get<Ciudad[]>(`${this.urlCiudades}/${this.nombre}`);
  }
  agregarCiudad(ciudad:Ciudad): Observable<Ciudad>{
    return this.http.post<Ciudad>(this.urlCiudades, ciudad,{headers : this.httpHeaders });
  }
  getCiudad(id):Observable<Ciudad>{
    return this.http.get<Ciudad>(`${this.urlECiudades}/${id}`)
  }

  actualizarCiudad(ciudad:Ciudad):Observable<Ciudad>{
    return this.http.put<Ciudad>(`${this.urlCiudades}/${ciudad.id}`,ciudad, {headers : this.httpHeaders });
  }
  borrarCiudad(id:number): Observable<Ciudad>{
    return this.http.delete<Ciudad>(`${this.urlCiudades}/${id}`,{headers: this.httpHeaders});
  }
}
