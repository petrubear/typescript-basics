import * as Nedb from 'nedb';
import {SessionToken} from '../server/model/Models';

export class SessionTokenDBAccess {
    private nedb: Nedb;

    public constructor() {
        this.nedb = new Nedb('database/SessionToken.db');
        this.nedb.loadDatabase();
    }

    public async storeSessionToken(token: SessionToken): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.nedb.insert(token, (err: Error | null, document: SessionToken) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public async getToken(tokenId: string): Promise<SessionToken | undefined> {
        return new Promise<SessionToken | undefined>((resolve, reject) => {
            this.nedb.find({tokenId: tokenId}, (err: Error | null, documents: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    if (documents.length === 0) {
                        resolve(undefined);
                    } else {
                        resolve(documents[0]);
                    }
                }
            });
        });
    }
}
