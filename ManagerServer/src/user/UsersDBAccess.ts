import * as Nedb from 'nedb';
import {User} from '../shared/Model';

export class UsersDBAccess {
    private nedb: Nedb;

    public constructor() {
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.nedb.insert(user, (error: Error | null) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
