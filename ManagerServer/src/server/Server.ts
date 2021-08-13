import {createServer, IncomingMessage, ServerResponse} from 'http';
import {Utils} from './Utils';
import {LoginHandler} from './handlers/LoginHandler';
import {Authorizer} from '../authorization/Authorizer';
import {UsersHandler} from './handlers/UsersHandler';

export class Server {
    private authorizer: Authorizer = new Authorizer();
    private port: number = 3000;

    public createServer() {
        createServer(async (req: IncomingMessage, res: ServerResponse) => {
            console.log(`got request from ${req.url}`);
            this.addCorsHeader(res);
            const basePath = Utils.getUrlBasePath(req.url);

            switch (basePath) {
                case 'login':
                    await new LoginHandler(req, res, this.authorizer).handleRequest();
                    break;
                case 'users':
                    await new UsersHandler(req, res, this.authorizer).handleRequest();
                    break;
                default:
                    break;
            }

            res.end();
        }).listen(this.port);
        console.log(`Server listening on port ${this.port}`);
    }

    private addCorsHeader(res: ServerResponse): void {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
    }
}
