import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IReturn, JsonServiceClient } from "@servicestack/client";
import { AuthUtils } from "app/core/auth/auth.utils";
import { UserService } from "app/core/user/user.service";
import { catchError, Observable, of, switchMap, throwError } from "rxjs";
import {
  Authenticate,
  AuthenticateResponse,
  ForgotPassword,
  PreAuthenticate,
  RestoreUserPassword,
  ValidateRestorePasswordToken,
} from "../dtos/dtos";
import { Router } from "@angular/router";
import { SessionService } from "../service/session.service";
import { AvailableLangs, TranslocoService } from "@jsverse/transloco";
import { LanguagesComponent } from "app/layout/common/languages/languages.component";
import { LoadingService } from "../loading/loading.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private _clientService = inject(JsonServiceClient);
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  private _userService = inject(UserService);
  private _storeService = inject(SessionService);
  private router = inject(Router);
  private _loadingService = inject(LoadingService);
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  get accessToken(): string {
    return localStorage.getItem("accessToken") ?? "";
  }

  get authenticated(): boolean {
    return this._storeService.getStorage("authenticated");
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */

  forgotPassword(email: string): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .post(new ForgotPassword({ email }))
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          resolve(e.responseStatus);
        })
        .finally(() => {
          this._loadingService.isLoading.set(false);
        });
    });
  }

  /**
   * Reset password
   *
   * @param password
   * @param token
   */

  restorePassword(password: string, token: string): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .put(new RestoreUserPassword({ newPassword: password, token: token }))
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          resolve(e.responseStatus);
        })
        .finally(() => {
          this._loadingService.isLoading.set(false);
        });
    });
  }

  /**
   * Reset password
   *
   * @param password
   * @param token
   */

  validateRestorePassword(token: any): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .post(new ValidateRestorePasswordToken({ token: token }))
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          resolve(e.responseStatus);
        })
        .finally(() => {
          this._loadingService.isLoading.set(false);
        });
    });
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: Authenticate): Promise<any> {
    return new Promise((resolve, reject) => {
      credentials.provider = "credentials";
      this._clientService
        .post(new Authenticate(credentials))
        .then((response: AuthenticateResponse) => {
          this._authenticated = true;
          this._storeService.signIn(response);
          this._userService.getAccount();

          // Validar token
          this._storeService.setStorage("authenticated", this._authenticated);

          resolve(response);
        })
        .catch((e) => {
          resolve(e.responseStatus);
        });
    });
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(credentials: {
    userName: string;
    password: string;
  }): Promise<any> {
    return new Promise((resolve, reject) => {
      this._clientService
        .post(new PreAuthenticate(credentials))
        .then((response) => {
          resolve(response.responseStatus);
        })
        .catch((e) => {
          resolve(e.responseStatus);
        });
    });
  }

  /**
   * Sign out
   */
  signOut(): Promise<any> {
    const requestBody = new Authenticate({ provider: "logout" });

    return this._clientService.postToUrl(
      this._clientService.baseUrl + "/auth/logout",
      requestBody
    );
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<any> {
    return this._httpClient.post("api/auth/sign-up", user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post("api/auth/unlock-session", credentials);
  }
}
