import {Account, SessionToken, TokenGenerator} from '../server/model/Models';
import {UserCredentialsDBAccess} from './UserCredentialsDBAccess';

export class Authorizer implements TokenGenerator {
    private userCredentialsDBAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const resultAccount = await this.userCredentialsDBAccess.getUserCredential(account.username, account.password);

        if (resultAccount) {
            return {tokenId: 'some token'};
        } else {
            return undefined;
        }
    }
}
