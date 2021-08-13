import {BaseController} from './BaseController';
import {LoginService} from '../services/LoginService';
import {LinkTextValue} from './Decorators';

export class LoginController extends BaseController {
    private loginService: LoginService = new LoginService();
    private errorLabel = this.createElement('label');

    // eslint-disable-next-line new-cap
    @LinkTextValue('errorLabel')
    private errorLabelText: string = '';

    public createView(): HTMLDivElement {
        this.errorLabel.id = 'errorLabel';
        this.errorLabel.style.color = 'red';
        const title = this.createElement('h2', 'Please Login');
        const userName = this.createElement('label', 'Username');
        const userNameInput = this.createElement('input');
        const password = this.createElement('label', 'Password');
        const passwordInput = this.createElement('input');
        passwordInput.type = 'password';
        const loginButton = this.createElement('button',
            'Login',
            async () => {
                if (userNameInput.value && passwordInput.value) {
                    this.errorLabelText = '';
                    const result = await this.loginService.login(userNameInput.value, passwordInput.value);
                    if (result.isPresent()) {
                        this.router.switchToDashboardView(result);
                    } else {
                        this.errorLabelText = 'invalid username or password';
                    }
                } else {
                    this.showErrorLabel('Please fill both fields');
                }
            });

        this.resetErrorLabel();

        this.container.append(title,
            userName, userNameInput, this.br(),
            password, passwordInput, this.br(),
            loginButton, this.br(), this.errorLabel);
        return this.container;
    }

    private resetErrorLabel(): void {
        this.errorLabel.style.visibility = 'hidden';
    }

    private showErrorLabel(errorMessage: string): void {
        this.errorLabel.style.color = 'red';
        this.errorLabel.innerText = errorMessage;
        this.errorLabel.style.visibility = 'visible';
    }
}
