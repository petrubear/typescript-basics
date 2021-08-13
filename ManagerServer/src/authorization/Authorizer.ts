import {Account, SessionToken, TokenGenerator, TokenRights, TokenState, TokenValidator} from '../server/model/Models';
import {UserCredentialsDBAccess} from './UserCredentialsDBAccess';
import {SessionTokenDBAccess} from './SessionTokenDBAccess';
import {logInvocation} from '../shared/MethodDecorators';

export class Authorizer implements TokenGenerator, TokenValidator {
    private userCredentialsDBAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    private sessionTokenDbAccess: SessionTokenDBAccess = new SessionTokenDBAccess();

    @logInvocation
    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const resultAccount = await this.userCredentialsDBAccess.getUserCredential(account.username, account.password);

        if (resultAccount) {
            const token: SessionToken = {
                accessRights: resultAccount.accessRights,
                expirationTime: this.generateExporationTime(),
                username: resultAccount.username,
                valid: true,
                tokenId: this.generateRandomTokenId(),
            };

            await this.sessionTokenDbAccess.storeSessionToken(token);
            return token;
        } else {
            return undefined;
        }
    }

    private generateExporationTime(): Date {
        return new Date(Date.now() + 60 * 60 * 1000);
    }

    private generateRandomTokenId(): string {
        return Math.random().toString(36).slice(2);
    }

    public async validateToken(tokenId: string): Promise<TokenRights> {
        const token = await this.sessionTokenDbAccess.getToken(tokenId);
        if (!token || !token.valid) {
            return {
                accessRights: [],
                state: TokenState.INVALID,
            };
        } else if (token.expirationTime < new Date()) {
            return {
                accessRights: [],
                state: TokenState.EXPIRED,
            };
        } else {
            return {
                accessRights: token.accessRights,
                state: TokenState.VALID,
            };
        }
    }
}
