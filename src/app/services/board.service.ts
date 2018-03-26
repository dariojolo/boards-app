import { Injectable } from '@angular/core';
import { BOARDS } from '../components/boards/boards.json'
import { Board } from 'app/components/models/board'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { map } from 'rxjs/operators'
@Injectable()
export class BoardService {

private urlEndPoint:string = 'http://localhost:8080/api/boards2'
  constructor( private http:HttpClient) { }

  getBoards():Observable<void>{
    //return of(BOARDS);
    /*let objeto:Object = this.http.get<Board[]>(this.urlEndPoint);
    console.log("getBoards " + objeto.toString);
    return this.http.get<Board[]>(this.urlEndPoint); */

    let board:Board;
    this.http.get(this.urlEndPoint).pipe(
      map(res => {console.log("Res: " + res);} ));
      return null;

  }
}
