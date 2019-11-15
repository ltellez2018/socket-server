
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();



router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });

});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    // * Payload to 'mensaje-nuevoo'
    const payload = {
        de,
        cuerpo
    }

    // * Conection to Web Socket Server
    const server = Server.instance;

    // * Send Message on particular room
    server.io.emit('mensaje-nuevo', payload);


    res.json({
        ok: true,
        cuerpo,
        de
    });

});


router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    // * Payload to 'mensaje-privado'
    const payload = {
        de,
        cuerpo
    }

    // * Conection to Web Socket Server
    const server = Server.instance;

    // * Send Message on particular room
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


// **************************************************** //
// ***           'All  Users ids'                   *** //
// **************************************************** //

router.get('/usuarios', (req: Request, resp: Response) => {

    const server = Server.instance;
    server.io.clients( (err: any, clientes: string []) => {
        
        if( err ) {
            return resp.json({
                 ok: false,
                 err
         });
        }

        resp.json({
            ok: true,
            clientes
        });

    });
});

export default router;


// **************************************************** //
// ***   'Get users and theirs names'              *** //
// **************************************************** //

router.get('/usuarios/detalle', (req: Request, resp: Response) => {

   
    resp.json({
        ok: true,
        clientes:  usuariosConectados.obtenerLista()
    });
});