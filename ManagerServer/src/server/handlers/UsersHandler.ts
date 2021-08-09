import {IncomingMessage, ServerResponse} from 'http';
import {UsersDBAccess} from '../../user/UsersDBAccess';
import {AccessRight, HTTP_CODES, HTTP_METHODS} from '../../shared/Model';
import {Utils} from '../Utils';
import {BaseRequestHandler} from './BaseRequestHandler';
import {TokenValidator} from '../model/Models';

export class UsersHandler extends BaseRequestHandler {
    private usersDBAccess: UsersDBAccess;
    private tokenValidator: TokenValidator;

    public constructor(req: IncomingMessage, res: ServerResponse, tokenValidator: TokenValidator) {
        super(req, res);
        this.tokenValidator = tokenValidator;
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
        const operationAuthorized = await this.operationAuthorized(AccessRight.READ);
        if (operationAuthorized) {
            const parsedUrl = Utils.getUrlParameters(this.req.url);
            if (parsedUrl) {
                const userId = parsedUrl.query.id;
                if (userId) {
                    const user = await this.usersDBAccess.getUserById(userId as string);
                    if (user) {
                        this.respondJsonObject(HTTP_CODES.OK, user);
                    } else {
                        await this.handleNotFound();
                    }
                } else {
                    this.respondBadRequest('userId not present in request');
                }
            }
        } else {
            this.respondUnauthorized('missing or invalid authentication');
        }
    }

    private async operationAuthorized(operation: AccessRight):
        Promise<boolean> {
        const tokenId = this.req.headers.authorization;
        if (tokenId) {
            const tokenRights = await this.tokenValidator.validateToken(tokenId);
            if (tokenRights.accessRights.includes(operation)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
