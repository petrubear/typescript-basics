export abstract class BaseController {
    protected container: HTMLDivElement = document.createElement('div');

    abstract createView(): HTMLDivElement;

    protected createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, innerText?: string):
        HTMLElementTagNameMap[K] {
        const element = document.createElement(tagName);
        if (innerText) {
            element.innerText = innerText;
        }
        return element;
    }
}
