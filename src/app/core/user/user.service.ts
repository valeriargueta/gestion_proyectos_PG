import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { JsonServiceClient } from "@servicestack/client";
import { User } from "app/core/user/user.types";
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from "rxjs";
import { AvailableLangs, TranslocoService } from '@jsverse/transloco';
import {
  CreateUserData,
  GetAccount,
  GetAccountResponse,
  GetLanguages,
  GetTimeZones,
  GetUserData,
  GetUsersData,
  ToggleUserStatus,
  UpdateUserData,
  UserModel,
} from "../dtos/dtos";
import { DataService } from "../data/data.service";
import { LoadingService } from "../loading/loading.service";
import { SessionService } from "../service/session.service";

@Injectable({ providedIn: "root" })
export class UserService {
  private _clientService = inject(JsonServiceClient);
  private _storeService = inject(SessionService);
  private _httpClient = inject(HttpClient);
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
  private _dataService = inject(DataService);
  userSignal = signal<UserModel>(null);
  private _loadingService = inject(LoadingService);
  private _translocoService = inject(TranslocoService);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  getAccount() {
    let lang ='';
    // Get user authenticated
    let userSession = this._storeService.getStorage("AUTH");

    if (userSession.userId)
      this._clientService
        .get(new GetAccount())
        .then((res: GetAccountResponse) => {
          this.userSignal.set(res.user);
          lang = res.user.language.substring(0, 2);
        }).finally(() => {
          this._translocoService.setActiveLang(lang); //set language
        })
  }

  getUsers(page: number, itemsPerPage: number,displayNameFilter?: string ): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .get(new GetUsersData({ page: page, itemsPerPage: itemsPerPage, displayNameFilter }))
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

  getUserData(id: number): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .get(new GetUserData({ id: id }))
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

  updateUserStatus(data: { id: number }): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .put(new ToggleUserStatus(data))
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
   * Create user data
   */
  createUser(data: {
    firstName: string;
    lastname: string;
    email: string;
    roles: number[];
    timeZone: string;
    language: string;
  }): Promise<any> {
    this._loadingService.isLoading.set(true);

    return new Promise((resolve, reject) => {
      this._clientService
        .post(new CreateUserData(data))
        .then((response) => {
          console.log(response);
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
   * Update user data
   */
  updateUser(data: {
    id: number;
    firstName: string;
    lastname: string;
    roles: number[];
    language: string,
    timeZone: string
  }): Promise<any> {
    this._loadingService.isLoading.set(true);

    return new Promise((resolve, reject) => {
      this._clientService
        .put(new UpdateUserData(data))
        .then((response) => {
          console.log(response);
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
  getTimeZones(): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .get(new GetTimeZones())
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
  getLanguages(): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .get(new GetLanguages())
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
   * Get the current signed-in user data
   */
  get(): Observable<User> {
    return this._httpClient.get<User>("api/common/user").pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  /**
   * Update the user
   *
   * @param user
   */
  update(user: User): Observable<any> {
    return this._httpClient.patch<User>("api/common/user", { user }).pipe(
      map((response) => {
        this._user.next(response);
      })
    );
  }
}
