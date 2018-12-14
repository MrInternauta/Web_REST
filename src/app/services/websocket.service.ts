import { Injectable } from '@angular/core';
import socketIO from 'socket.io';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public usuario: Usuario;
  constructor(
    private socket: Socket
  ) {
    this.cargar_storage();
    this.checkstatus();
    }
  // Checa el estado del server
  checkstatus() {
    // si de conecta el servidor
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });
    // si se desconecta
    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });

  }
  // Emitir todos los eventos de la app angular  evento: tipo, payload?:que vas a enviar , callback?: Function
  emit(evento: string, payload?: any, callback?: Function  ) {
    console.log('Emitiendo mensaje desde angular');
    this.socket.emit(evento, payload, callback); // hace uso de la class socket
  }
  // escucha los eventos del servidor
  listen(evento: string) {
    // regresa  un observable del evento
    return this.socket.fromEvent( evento );
  }
  loginWs(nombre: string ) {
    return new Promise((resolve, reject) => {
      this.emit('configurar-usuario', { nombre }, (res) => { console.log(res); });
      this.usuario = new Usuario(nombre);
      this.guardar();
      resolve();
    });
  }

  guardar() {
      localStorage.setItem('usuario', JSON.stringify(this.usuario));
  }
  getUsuario() {
    return this.usuario;
  }
  cargar_storage () {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse(localStorage.getItem('usuario') );
      this.loginWs(this.usuario.nombre );
    }

  }
}
