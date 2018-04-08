import { Injectable } from '@angular/core';
//import { BOARDS } from '../components/boards/boards.json'
import { Board } from 'app/components/models/board'
import { Ciudad } from 'app/components/models/ciudad'
import { Observable } from 'rxjs/Observable'

import { HttpClient ,HttpHeaders } from '@angular/common/http'



@Injectable()
export class BoardService {

urlBoards:string='http://localhost:8080/api/boards/nombre';
urlBoardsS:string='http://localhost:8080/api/boards/';
urlCiudades:string='http://localhost:8080/api/boards/ciudades';
urlECiudades:string='http://localhost:8080/api/boards/Eciudades';

boardActual:Board;
board:Board;
boards:Board[];
usuario:string;
nombre:string;

private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor( private http:HttpClient) { }

  getBoards(usuario: string): Observable<Board[]>{
    console.log("Llamando al rest que devuelve un board del usuario: " + usuario);
    return  this.http.get<Board[]>(`${this.urlBoards}/${usuario}`);
  }

  getCiudades(nombre:string):Observable<Ciudad[]>{
    console.log("Nombre recibido " + nombre);
    this.nombre = nombre;
    return this.http.get<Ciudad[]>(`${this.urlCiudades}/${nombre}`);
  }

  agregarCiudad(ciudad:Ciudad): Observable<Ciudad>{
    return this.http.post<Ciudad>(this.urlCiudades, ciudad,{headers : this.httpHeaders });
  }
  getCiudad(id):Observable<Ciudad>{
    console.log("BoardService getCiudad ID: " + id);
    return this.http.get<Ciudad>(`${this.urlECiudades}/${id}`)
  }

  actualizarCiudad(ciudad:Ciudad):Observable<Ciudad>{
    return this.http.put<Ciudad>(`${this.urlCiudades}/${ciudad.id}`,ciudad, {headers : this.httpHeaders });
  }
  borrarCiudad(id:number): Observable<Ciudad>{
    console.log("ID ciudad a eliminar: " + id);
    return this.http.delete<Ciudad>(`${this.urlCiudades}/${id}`,{headers: this.httpHeaders});
  }

  agregarBoard(board:Board): Observable<Board>{
    return this.http.post<Board>(this.urlBoardsS, board,{headers : this.httpHeaders });
  }
  actualizarBoard(board:Board):Observable<Board>{
    return this.http.put<Board>(`${this.urlBoardsS}/${board.id}`,board, {headers : this.httpHeaders });
  }
  borrarBoard(id:number): Observable<Board>{
    console.log("ID board a eliminar: " + id);
    return this.http.delete<Board>(`${this.urlBoardsS}/${id}`,{headers: this.httpHeaders});
  }
}
