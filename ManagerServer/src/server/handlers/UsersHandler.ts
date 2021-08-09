import {Handler} from '../model/Models';
import {IncomingMessage, ServerResponse} from 'http';
import {UsersDBAccess} from '../../user/UsersDBAccess';
import {HTTP_CODES, HTTP_METHODS} from '../../shared/Model';
import {Utils} from '../Utils';

export class UsersHandler implements Handler {
    private req: IncomingMessage;
    private res: ServerResponse;
    private usersDBAccess: UsersDBAccess;


    public constructor(req: IncomingMessage, res: ServerResponse) {
        this.req = req;
        this.res = res;
        this.usersDBAccess = new UsersDBAccess();
    }

    async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.GET:
                await this.handleGet();
                break;
            default:
                await this.handleNotFound();
                break;
        }
    }

    private async handleGet() {
        const parsedUrl = Utils.getUrlParameters(this.req.url);
    }

    private async handleNotFound(): Promise<void> {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('not found');
    }
}
