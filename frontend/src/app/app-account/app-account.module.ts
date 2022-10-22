import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LanguageModule } from 'src/language/language.module';
import { NotificationService } from 'src/utils/notification.service';
import { AppAddNameComponent } from './app-add-name/app-add-name.component';
import { AppAccountRoutingModule } from './app-account-routing.module';
import { AppAccountComponent } from './app-account.component';
import { AppCreateAccountComponent } from './app-create-account/app-create-account.component';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppLogoutComponent } from './app-logout/app-logout.component';
import { AppRestorePasswordComponent } from './app-restore-password/app-restore-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,
        LanguageModule,
        AppAccountRoutingModule],
    exports: [],
    declarations: [AppLoginComponent, 
        AppRestorePasswordComponent,
        AppCreateAccountComponent,
        AppAccountComponent,
        AppLogoutComponent,
        AppAddNameComponent],
    providers: [NotificationService],
})
export class AppAccountModule { }
