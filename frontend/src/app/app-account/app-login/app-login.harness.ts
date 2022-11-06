import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';

export class AppLoginHarness extends ComponentHarness {
    static hostSelector = 'app-login';

    private _getForm = this.locatorFor('form');

    static with(options: BaseHarnessFilters) {
        return new HarnessPredicate<AppLoginHarness>(AppLoginHarness, options);
    }

    private _getEmailInput = this.locatorFor('input#email');
    private _getPasswordInput = this.locatorFor('input#password');

    async setEmail(email: string) {
        const emailInput = await this._getEmailInput();
        await emailInput.dispatchEvent('input');
        return (await this._getEmailInput()).setInputValue(email);
    }

    async setPassowrd(password: string) {
        const passwordInput = await this._getPasswordInput();
        await passwordInput.dispatchEvent('input');
        return (await this._getPasswordInput()).setInputValue(password);
    }
}