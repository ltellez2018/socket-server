import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

// **************************************************** //
// ***              'Conected Users'                *** //
// **************************************************** //
export const usuariosConectados = new UsuariosLista();


// **************************************************** //
// ***          'Confoguring user'                  *** //
// **************************************************** //
export const conectarCliente = ( client: Socket ) => {
    const usuario = new Usuario (client.id);
    usuariosConectados.agregar(usuario);
}

// **************************************************** //
// ***   'Disconecting Client'                      *** //
// **************************************************** //    
export const desconectar = ( cliente: Socket) =>{
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');   
        usuariosConectados.borrarUsuario(cliente.id);          
    });
};

// **************************************************** //
// ***           'Listennig mesagge'                *** //
// **************************************************** //
export const mensaje = (cliente: Socket, io: socketIO.Server) =>{
    cliente.on('mensaje', (payload: {de: string , cuerpo: string} )=>{
            console.log('Mensaje recibido',  payload);
            io.emit('mensaje-nuevo',payload);
            
    });
};



// **************************************************** //
// ***           'Listennig Usuario Config'                *** //
// **************************************************** //
export const configurarUsauruo = (cliente: Socket, io: socketIO.Server) =>{
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback : Function )=>{
            
            usuariosConectados.actualizarNombre(cliente.id , payload.nombre );
            callback({
                ok: true,
                mensaje: `Usuario ${ payload.nombre} configurado`
            })
            //io.emit('configurar-usuario',payload);
            
    });
};


