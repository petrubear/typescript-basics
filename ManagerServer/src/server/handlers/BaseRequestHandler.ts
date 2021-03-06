import {IncomingMessage, ServerResponse} from 'http';
import {Handler} from '../model/Models';
import {HTTP_CODES} from '../../shared/Model';

export abstract class BaseRequestHandler implements Handler {
    protected req: IncomingMessage;
    protected res: ServerResponse;

    protected constructor(req: IncomingMessage, res: ServerResponse) {
        this.req = req;
        this.res = res;
    }

    abstract handleRequest(): Promise<void>;

    protected async handleNotFound(): Promise<void> {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('not found');
    }

    protected async getRequestBody(): Promise<any> {
        return new Promise((resolve, reject) => {
            let body = '';
            this.req.on('data', (data: string) => {
                body += data;
            });
            this.req.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (error) {
                    reject(error);
                }
            });
            this.req.on('error', (error: any) => {
                reject(error);
            });
        });
    }

    protected respondJsonObject(code: HTTP_CODES, object: any): void {
        this.res.writeHead(code, {'Content-Type': 'application/json'});
        this.res.write(JSON.stringify(object));
    }

    protected respondBadRequest(message: string): void {
        this.res.statusCode = HTTP_CODES.BAD_REQUEST;
        this.res.write(message);
    }

    protected respondUnauthorized(message: string): void {
        this.res.statusCode = HTTP_CODES.UNAUTHORIZED;
        this.res.write(message);
    }

    protected respondText(code: HTTP_CODES, message: string): void {
        this.res.statusCode = code;
        this.res.write(message);
    }
}
