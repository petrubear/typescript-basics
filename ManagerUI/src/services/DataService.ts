import {User} from '../model/DataModels';

const baseUrl = 'http://localhost:3000';
const usersUrl = baseUrl + '/users';

export class DataService {
    public async getUsers(authorization: string, nameQeury: string): Promise<User[]> {
        const url = `${usersUrl}?name=${nameQeury}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
        };
        const result = await fetch(url, options);
        return await result.json();
    }
}
