import {BaseController} from './BaseController';

export class LoginController extends BaseController {
    public createView(): HTMLDivElement {
        const title = this.createElement('h2', 'Please Login');

        const userName = this.createElement('label', 'Username');
        const userNameInput = this.createElement('input');
        const breakElement = this.createElement('br');
        const password = this.createElement('label', 'Password');
        const passwordInput = this.createElement('input');
        passwordInput.type = 'password';
        const breakElement2 = this.createElement('br');
        const button = this.createElement('button', 'Login');

        this.container.append(title,
            userName, userNameInput, breakElement,
            password, passwordInput, breakElement2, button);
        return this.container;
    }
}
