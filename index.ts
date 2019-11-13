import Server from './classes/server';
import router  from "./routes/router";
import bodyparser from 'body-parser';
import cors from 'cors';


// * SERVER
const server =  Server.instance;

// * BODY PARSER
server.app.use(bodyparser.urlencoded({ extended: true}));
server.app.use(bodyparser.json());

// * CORS
server.app.use(cors({origin: true, credentials: true }));

// * ENDPOINTS (REST SERVICES)
server.app.use('/', router );

// * START SERVER
server.start( () => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);    
}); 