import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Ciudad } from 'app/components/models/ciudad'
import { BoardService } from 'app/services/board.service'

import * as $ from 'jquery';

@Component({
  selector: 'app-testsocket',
  templateUrl: './testsocket.component.html',
  styleUrls: ['./testsocket.component.css']
})
export class TestsocketComponent implements OnInit{
  private serverUrl = 'http://localhost:8080/clima-websocket'
  private title = 'WebSockets chat';
  private stompClient;
  private salida:String = '';

  private ciudad:Ciudad;
  constructor(boardService: BoardService){ }
  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/topic", (ciudad) => {
        if(ciudad) {
          that.ciudad = JSON.parse(ciudad.body);
          console.log("Ciudad :" + that.ciudad.nombre);
          this.that.boardService.boards.forEach(board => {
              board.ciudades.forEach(ciudad => {
                if (ciudad.nombre == this.this.ciudad.nombre){
                  ciudad.temperatura = this.this.ciudad.temperatura;
                }
              });

          });
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }
}
