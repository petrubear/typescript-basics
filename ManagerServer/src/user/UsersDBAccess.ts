import * as Nedb from 'nedb';
import {User} from '../shared/Model';

export class UsersDBAccess {
    private nedb: Nedb;

    public constructor() {
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User): Promise<void> {
        if (!user.id) {
            user.id = this.generateUserId();
        }
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

    public async getUserById(userId: string): Promise<User | undefined> {
        return new Promise<User | undefined>((resolve, reject) => {
            this.nedb.find({id: userId}, (err: Error | null, docs: any) => {
                if (err) {
                    reject(err);
                } else {
                    if (docs.length == 0) {
                        resolve(undefined);
                    } else {
                        resolve(docs[0]);
                    }
                }
            });
        });
    }

    public async getUserByName(name: string): Promise<User[]> {
        const regEx = new RegExp(name);
        return new Promise<User[]>((resolve, reject) => {
            this.nedb.find({name: regEx}, (err: Error | null, docs: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    private generateUserId(): string {
        return Math.random().toString(36).slice(2);
    }
}
