import { NgModule } from '@angular/core';
import { LanguageModule } from 'src/language/language.module';
import { AppHeaderModule } from './app-header/app-header.module';
import { AppSideMenuModule } from './app-side-menu/app-side-menu.module';
import { AppUserRoutingModule } from './app-user-routing.module';

import { AppUserComponent } from './app-user.component';
import { UserService } from './app-user.service';

@NgModule({
    imports: [AppHeaderModule, AppUserRoutingModule, AppSideMenuModule, LanguageModule],
    declarations: [AppUserComponent],
    providers: [UserService],
    bootstrap: [AppUserComponent]

})
export class AppUserModule { }
