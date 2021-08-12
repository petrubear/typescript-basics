import {Router} from '../Router';

export abstract class BaseController {
    protected container: HTMLDivElement;
    protected router: Router;

    constructor(router: Router) {
        this.router = router;
        this.container = document.createElement('div');
    }

    abstract createView(): HTMLDivElement;

    protected createElement<K extends keyof HTMLElementTagNameMap>(
        tagName: K,
        innerText?: string,
        action?: { (): void }): HTMLElementTagNameMap[K] {
        const element = document.createElement(tagName);
        if (innerText) {
            element.innerText = innerText;
        }
        if (action) {
            element.onclick = action;
        }
        this.container.append(element);
        return element;
    }

    protected br(): HTMLBRElement {
        return document.createElement('br');
    }
}
