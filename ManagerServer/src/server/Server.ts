import {createServer, IncomingMessage, ServerResponse} from 'http';
import {Utils} from './Utils';
import {LoginHandler} from './handlers/LoginHandler';
import {Authorizer} from '../authorization/Authorizer';

export class Server {
    private authorizer: Authorizer = new Authorizer();

    public createServer() {
        createServer(async (req: IncomingMessage, res: ServerResponse) => {
            console.log(`got request from ${req.url}`);
            const basePath = Utils.getUrlBasePath(req.url);

            switch (basePath) {
                case 'login':
                    await new LoginHandler(req, res, this.authorizer).handleRequest();
                    break;
                default:
                    break;
            }

            res.end();
        }).listen(3000);
        console.log('server started');
    }
}
