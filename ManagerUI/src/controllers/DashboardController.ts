import {BaseController} from './BaseController';
import {AccessRight, SessionToken} from '../model/AuthenticationModel';
import {DataService} from '../services/DataService';

export class DashboardController extends BaseController {
    private sessionToken: SessionToken | undefined;
    private searchArea: HTMLInputElement | undefined;
    private resultArea: HTMLDivElement | undefined;
    private dataService: DataService = new DataService();

    public setSessionToken(sessionToken: SessionToken) {
        this.sessionToken = sessionToken;
    }

    createView(): HTMLDivElement {
        const title = this.createElement('h2', 'DashboardController');
        const label = this.createElement('label');
        if (this.sessionToken) {
            label.innerText = `welcome ${this.sessionToken.username}`;
            this.generateButtons();
        } else {
            label.innerText = 'please go to the public area of this app';
        }

        this.container.prepend(title, label, this.br());
        return this.container;
    }

    private generateButtons() {
        if (this.sessionToken) {
            console.dir(this.sessionToken);
            for (const access of this.sessionToken.accessRights) {
                this.container.append(
                    this.createElement('button',
                        AccessRight[access],
                        async () => {
                            await this.triggerAction(access);
                        }),
                );
            }
            if (this.sessionToken?.accessRights.includes(AccessRight.READ)) {
                this.searchArea = this.createElement('input');
                this.resultArea = this.createElement('div');
                this.container.append(
                    this.br(),
                    this.createElement('label', 'Search'),
                    this.searchArea,
                    this.resultArea,
                    this.br(),
                );
            }
        }
    }

    private async triggerAction(access: AccessRight) {
        switch (access) {
            case AccessRight.READ:
                this.resultArea!.innerText = '';
                const users = await this.dataService.getUsers(
                    this.sessionToken!.tokenId,
                    this.searchArea!.value,
                );

                for (const user of users) {
                    this.resultArea!.append(
                        this.createElement('label', JSON.stringify(user)),
                        this.br(),
                    );
                }
                break;
            default:
                break;
        }
    }
}
