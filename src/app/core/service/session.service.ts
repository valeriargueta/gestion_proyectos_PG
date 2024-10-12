import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import {
  JsonServiceClient,
  GetNavItemsResponse,
  UserAttributes,
  IAuthSession,
} from "@servicestack/client";
import { BehaviorSubject, of } from "rxjs";
import { AvailableLangs, TranslocoService } from "@jsverse/transloco";
import {
  Authenticate,
  GetSessionPermissions,
  GetSessionPermissionsResponse,
} from "../dtos/dtos";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  private _client = inject(JsonServiceClient);
  nav: BehaviorSubject<GetNavItemsResponse> = null;

  userSession: WritableSignal<IAuthSession> = null;
  userAttributes: WritableSignal<string[]> = null;
  userPermissions: WritableSignal<string[]> = signal([]);
  NAV_ITEMS: string = "NAV_ITEMS";
  AUTH: string = "AUTH";
  private _translocoService: TranslocoService;
  Permission = signal<string[]>(null);

  constructor(private client: JsonServiceClient, private _router: Router) {
    this.nav = new BehaviorSubject(
      this.getStorage(this.NAV_ITEMS) as GetNavItemsResponse
    );

    //get session
    var auth: any = this.getStorage(this.AUTH);

    //create session
    this.userSession = signal(auth as IAuthSession);

    //create attribute
    this.userAttributes = signal(
      auth != null ? UserAttributes.fromSession(auth) : []
    );
  }

  public signIn(userSession: IAuthSession) {
        //update session
    this.userSession.set(userSession);
    //update attribute
    this.userAttributes.set(UserAttributes.fromSession(userSession));

    this.setStorage(this.AUTH, userSession);
  }
  async getSessionPermissions() {
    if (this.userPermissions().length > 0) return;
    try {
      const response: GetSessionPermissionsResponse = await this._client.get(
        new GetSessionPermissions({})
      );

      if (response.responseStatus?.errorCode !== "200")
        throw new Error("An error occurred while obtaining user permissions.");

      this.userPermissions.set(response.permissions);
    } catch (error: unknown) {
      this.userPermissions.set([]);
    }
  }

  getStorage(key: string): any {
    var sto: string = localStorage.getItem(key);
    if (!sto) return null;
    else {
      var data: any = JSON.parse(sto);
      if (!data.expireTime || data.expireTime < new Date().getTime()) {
        localStorage.removeItem(key);
        return null;
      } else {
        return data.value;
      }
    }
  }

  setStorage(key: string, value: any): void {
    localStorage.setItem(
      key,
      JSON.stringify({
        expireTime: new Date().getTime() + 12 * 3600 * 1000,
        value: value,
      })
    );
  }

  async signOut() {
   
    localStorage.clear();
    localStorage.removeItem("accessToken");
    this.userSession.set(null);
    this.userAttributes.set(null);
    this.userPermissions.set([]);
    this._router.navigate(["/sign-in"]);
  }
  // verify specific permission
  hasPermission(permission: string): boolean {
    return this.userPermissions().includes(permission);
  }

  // verify multipermissions
  hasPermissions(permissions: string[]): boolean {
    return permissions.every((perm) => this.userPermissions().includes(perm));
  }
}
