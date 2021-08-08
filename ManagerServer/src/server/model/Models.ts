import {AccessRight} from '../../shared/Model';

export interface Account {
    username: string;
    password: string;
}

export interface Handler {
    handleRequest(): Promise<void>
}

export interface SessionToken {
    tokenId: string,
    username: string,
    valid: boolean,
    expirationTime: Date,
    accessRights: AccessRight[];
}

export interface TokenGenerator {
    generateToken(account: Account): Promise<SessionToken | undefined>;
}
