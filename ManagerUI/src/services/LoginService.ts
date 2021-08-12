import {SessionToken} from '../model/AuthenticationModel';

export class LoginService {
    public async login(userName: string, password: string): Promise<SessionToken | undefined> {
        if (userName === 'user' && password === '123') {
            return {
                username: 'Some User',
            } as any;
        } else {
            return undefined;
        }
    }
}
