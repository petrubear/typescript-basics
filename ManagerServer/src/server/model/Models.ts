// Objects
export interface Account {
    username: string;
    password: string;
}

// Classes
export interface Handler {
    handleRequest(): Promise<void>
}

