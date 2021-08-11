export class MainController {
    public createView(): HTMLDivElement {
        const container = document.createElement('div');
        const title = document.createElement('h2');
        title.innerText = 'Welcome to my page';

        const article = document.createElement('div');
        article.innerText = 'bla bla bla ';

        const button = document.createElement('button');
        button.innerText = 'login';

        container.append(title, article, button);
        return container;
    }
}
