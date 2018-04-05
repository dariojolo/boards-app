import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

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

  constructor(){ }
  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/topic", (message) => {
        if(message.body) {
        //  $(".topic").append("<div class='message'>"+message.body+"</div>")
        //  console.log("El cuerpo: "+ message);
          that.salida += message.body;
        }
      });
    });
  }

  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }
}
