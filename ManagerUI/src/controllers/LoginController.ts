export class LoginController {
    public createView(): HTMLDivElement {
        const container = document.createElement('div');

        const title = document.createElement('h2');
        title.innerText = 'Please Login';

        const userName = document.createElement('label');
        userName.innerText = 'Username';
        const userNameInput = document.createElement('input');
        const breakElement = document.createElement('br');
        const password = document.createElement('label');
        password.innerText = 'Password';
        const passwordInput = document.createElement('input');
        const breakElement2 = document.createElement('br');
        const button = document.createElement('button');
        button.innerText = 'Login';

        container.append(title,
            userName, userNameInput, breakElement,
            password, passwordInput, breakElement2, button);
        return container;
    }
}
