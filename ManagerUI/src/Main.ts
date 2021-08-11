import {Router} from './Router';

export class Main {
    private router: Router = new Router();

    public constructor() {
        console.log('create new instance of Main');
    }

    public launchApp() {
        this.router.handleRequest();
    }
}

new Main().launchApp();
