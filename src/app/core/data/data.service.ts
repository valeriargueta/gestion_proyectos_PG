import { inject, Injectable, signal } from "@angular/core";
import { JsonServiceClient } from "@servicestack/client";
import {
  RestoreUserPassword,
  UpdateUserPassword,
  UpdateAccount,
} from "../dtos/dtos";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoadingService } from "../loading/loading.service";

@Injectable({ providedIn: "root" })
export class DataService {
  private _clientService = inject(JsonServiceClient);
  private _loadingService = inject(LoadingService);


  createRecoveryPassword(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._clientService
        .post(new RestoreUserPassword())
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          resolve(e.responseStatus);
        });
    });
  }

  updateAccount(user): Promise<any> {
    return new Promise((resolve, reject) => {
      this._clientService
        .put(new UpdateAccount({ user:{...user } }))
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          resolve(e.responseStatus);
        });
    });
  }

  updateUserPassword(userPassword): Promise<any> {
    return new Promise((resolve, reject) => {
      this._clientService
        .put(new UpdateUserPassword({ ...userPassword }))
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          resolve(e.responseStatus);
        });
    });
  }
}
