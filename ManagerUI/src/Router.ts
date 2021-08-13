import {MainController} from './controllers/MainController';
import {LoginController} from './controllers/LoginController';
import {SessionToken} from './model/AuthenticationModel';
import {DashboardController} from './controllers/DashboardController';
import {Optional} from './model/Optional';

export class Router {
    private mainElement = document.getElementById('main-container');

    public handleRequest() {
        console.log(`handle request from ${this.getRoute()}`);

        switch (this.getRoute()) {
            case '/login':
                this.switchToLoginView();
                break;
            case '/dashboard':
                this.switchToDashboardView(Optional.empty());
                break;
            default:
                if (this.mainElement) {
                    this.mainElement.innerHTML = '';
                    if (this.mainElement) {
                        const mainController: MainController = new MainController(this);
                        this.mainElement.append(mainController.createView());
                    }
                }
                break;
        }
    }

    public switchToLoginView(): void {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const loginController: LoginController = new LoginController(this);
            this.mainElement?.append(loginController.createView());
        }
    }

    public switchToDashboardView(sessionToken: Optional<SessionToken>): void {
        if (this.mainElement) {
            this.mainElement.innerHTML = '';
            const dashboardController: DashboardController = new DashboardController(this);
            if (sessionToken) {
                dashboardController.setSessionToken(sessionToken.get());
            }
            this.mainElement?.append(dashboardController.createView());
        }
    }

    private getRoute(): string {
        return window.location.pathname;
    }
}
