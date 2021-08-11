import {MainController} from './controllers/MainController';

export class Router {
    private mainElement = document.getElementById('main-container');

    public handleRequest() {
        console.log(`handle request from ${this.getRoute()}`);

        switch (this.getRoute()) {
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
