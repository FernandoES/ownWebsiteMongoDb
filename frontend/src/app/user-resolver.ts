import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DatabaseHandlerService } from "src/utils/database-handler.service";

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<Realm.User> {
  constructor(private databaseHandlerService: DatabaseHandlerService) {}

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Promise<Realm.User> {
    this.databaseHandlerService.initDatabaseApp();
    return this.databaseHandlerService.logIn();
  }
}