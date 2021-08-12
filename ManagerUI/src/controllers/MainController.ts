import {BaseController} from './BaseController';

export class MainController extends BaseController {
    public createView(): HTMLDivElement {
        const title = this.createElement('h2', 'Welcome to my page');
        const article = this.createElement('div', 'bla bla bla ');
        const button = this.createElement('button',
            'login',
            () => {
                this.router.switchToLoginView();
            });
        this.container.append(title, article, button);
        return this.container;
    }
}
