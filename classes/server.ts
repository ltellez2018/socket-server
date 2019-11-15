import express  from 'express';

// * GLOBAL CONFIG
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as mySocket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    // * SERVER SOCKET
    public io: socketIO.Server;
    private  httpServer: http.Server;
    

    private constructor(){
        // * EXPRESS SERVER
        this.app = express();
        this.port = SERVER_PORT;
        // * HTTP SERVER
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }
    
    public static get instance(){
        return this._instance || (this._instance = new this());
    }
    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');
         this.io.on('connection',cliente => {   
             //* Connecting CLient
             mySocket.conectarCliente(cliente);

             //* Configurando Usuario
             mySocket.configurarUsauruo( cliente, this.io);
            
             // * Messagges
              mySocket.mensaje(cliente, this.io);

             //* Desconecting
              mySocket.desconectar( cliente );
        });
        
    }

    start(callback: Function) {
        // * INIT HTTP SERVER
        this.httpServer.listen( this.port, callback() );
            
    }

}