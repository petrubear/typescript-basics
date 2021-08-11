import {MainController} from './controllers/MainController';
import {LoginController} from './controllers/LoginController';

export class Router {
    private mainElement = document.getElementById('main-container');

    public handleRequest() {
        console.log(`handle request from ${this.getRoute()}`);

        switch (this.getRoute()) {
            case '/login':
                const loginController: LoginController = new LoginController();
                this.mainElement?.append(loginController.createView());
                break;
            default:
                if (this.mainElement) {
                    const mainController: MainController = new MainController();
                    this.mainElement.append(mainController.createView());
                }
                break;
        }
    }

    private getRoute(): string {
        return window.location.pathname;
    }
}
