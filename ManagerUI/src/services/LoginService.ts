import {SessionToken} from '../model/AuthenticationModel';
import {Optional} from '../model/Optional';

const baseUrl = 'http://localhost:3000';
const loginUrl = baseUrl + '/login';

export class LoginService {
    public async login(userName: string, password: string): Promise<Optional<SessionToken>> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                password: password,
            }),
        };
        const result = await fetch(loginUrl, options);
        if (result.status === 201) {
            const value = await result.json();
            return Optional.of(value);
        } else {
            return Optional.empty();
        }
    }
}
