import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = '';
  mensjesSubscription: Subscription;
  mensajes: any[] = [];
  elemento: HTMLElement;
  constructor(
    public chat: ChatService
  ) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensjesSubscription = this.chat.getMessage().subscribe(data => {
      console.log(data );
      this.mensajes.push(data);
      setTimeout(() => {
        this.elemento.scrollTop =  this.elemento.scrollHeight;

      } , 50);
    });
  }
  ngOnDestroy(): void {
   this.mensjesSubscription.unsubscribe();
  }

  // enviar mensajes al servidor
  enviar() {
    if (this.texto.trim().length === 0) {
      return;
    }
    this.chat.sendMessage(this.texto);
    this.texto = '';

  }
}
