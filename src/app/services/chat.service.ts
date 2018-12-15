import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public wsservices: WebsocketService,
  ) { }
  //  envia mensaje al servidor
  sendMessage(mensaje: string) {
    const payload = {
      de: this.wsservices.getUsuario().nombre,
      cuerpo: mensaje
    };
    // Emmiye el mensaje enviandolo a webservices
    this.wsservices.emit('mensaje', payload);
  }

  getMessage() {
    return this.wsservices.listen('mensaje-nuevo');
  }
  getmessage_private() {
    return this.wsservices.listen('mensaje-privado');
  }
  GetUsuariosActivos() {
    return this.wsservices.listen('usuarios-activos');
  }
  emmitirGetUsuariosActivos() {
    return this.wsservices.emit('obtener-usuarios');
  }
}
