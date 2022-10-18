import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppAccountComponent } from "./app-account.component";

const routes: Routes = [{
    path: '',
    component: AppAccountComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppAccountRoutingModule {}