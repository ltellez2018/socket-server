import { Usuario } from './usuario';
export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {

    }

    // **************************************************** //
    // ***              'Add User'                      *** //
    // **************************************************** //
    public agregar( usuario: Usuario ) {
        this.lista.push(usuario);
        console.log( this.lista );
        return usuario;        
    } 

    public actualizarNombre( id: string, nombre: string ) {
      for (const usuario of this.lista) {
          if ( usuario.id === id ) {
              usuario.nombre = nombre;
              break;
          }          
      }
      
      console.log('Actualiando Usuario');
      console.log(this.lista);
    }

    public obtenerLista() {
        return this.lista;
    }

    public getUsuario( id: string ) {
        return this.lista.find( usuario => usuario.id === id);        
    }

    public getUserBySala(sala: string) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    public borrarUsuario(id: string) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter( usuario => usuario.id !== id);        
          return tempUser;
    }
}