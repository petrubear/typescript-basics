export interface Account {
    username: string;
    password: string;
}

export interface Handler {
    handleRequest(): Promise<void>
}

export interface SessionToken {
    tokenId: string;
}

export interface TokenGenerator {
    generateToken(account: Account): Promise<SessionToken | undefined>;
}
