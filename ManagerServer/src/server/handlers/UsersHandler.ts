import {IncomingMessage, ServerResponse} from 'http';
import {UsersDBAccess} from '../../user/UsersDBAccess';
import {HTTP_CODES, HTTP_METHODS} from '../../shared/Model';
import {Utils} from '../Utils';
import {BaseRequestHandler} from './BaseRequestHandler';

export class UsersHandler extends BaseRequestHandler {
    private usersDBAccess: UsersDBAccess;

    public constructor(req: IncomingMessage, res: ServerResponse) {
        super(req, res);
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
}
