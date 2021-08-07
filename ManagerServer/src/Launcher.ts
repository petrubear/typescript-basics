import {Server} from './server/Server';

class Launcher {
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
