import {Account, SessionToken, TokenGenerator} from '../server/model/Models';

export class Authorizer implements TokenGenerator {
    async generateToken(account: Account): Promise<SessionToken | undefined> {
        if (account.username === 'edison') {
            return {tokenId: 'some token'};
        } else {
            return undefined;
        }
    }
}
