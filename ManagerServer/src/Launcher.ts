import { Server } from './server/Server';

class Launcher {
    // instance variables
    // private name: string;
    private server: Server;

    // constructors
    constructor() {
        this.server = new Server();
    }

    public launchApp() {
        console.log('started app');
        this.server.createServer();
    }
}

new Launcher().launchApp();
