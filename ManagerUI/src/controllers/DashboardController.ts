import {BaseController} from './BaseController';
import {SessionToken} from '../model/AuthenticationModel';

export class DashboardController extends BaseController {
    private sessionToken: SessionToken | undefined;

    public setSessionToken(sessionToken: SessionToken) {
        this.sessionToken = sessionToken;
    }

    createView(): HTMLDivElement {
        const title = this.createElement('h2', 'DashboardController');
        const label = this.createElement('label');
        if (this.sessionToken) {
            label.innerText = `welcome ${this.sessionToken.username}`;
        } else {
            label.innerText = 'please go to the public area of this app';
        }

        this.container.append(title, label);
        return this.container;
    }
}
