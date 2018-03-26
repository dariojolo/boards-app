import { Injectable } from '@angular/core';
import { BOARDS } from '../components/boards/boards.json'
import { Board } from 'app/components/models/board'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class BoardService {

private urlEndPoint:string = 'http://localhost:8080/api/boards'
  constructor( private http:HttpClient) { }

  getBoards():Observable<Board[]>{
    //return of(BOARDS);
    return this.http.get<Board[]>(this.urlEndPoint);
  }
}
