import { inject, Injectable } from "@angular/core";
import { JsonServiceClient } from "@servicestack/client";
import {
  CreateRoleData,
  GetPermissions,
  GetRolesData,
  GetRoleData,
  UpdateRoleStatus,
  UpdateRoleData,
} from "../dtos/dtos";
import { LoadingService } from "../loading/loading.service";

@Injectable({ providedIn: "root" })
export class RolesService {
  private _clientService = inject(JsonServiceClient);
  private _loadingService = inject(LoadingService);

  getRoles(): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .get(new GetRolesData({}))
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

  getRole(id: number): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .get(new GetRoleData({ id }))
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

  getAllPermissions(): Promise<any> {
    return this._clientService.get(new GetPermissions({}));
  }

  updateRoleStatus(data: { id: number; status: boolean }): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .put(new UpdateRoleStatus(data))
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

  updateRoleData(data: {
    id: number;
    name: string;
    permissions: number[];
  }): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .put(new UpdateRoleData(data))
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
  createRole(data: { name: string; permissions: number[] }): Promise<any> {
    this._loadingService.isLoading.set(true);
    return new Promise((resolve, reject) => {
      this._clientService
        .post(new CreateRoleData(data))
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
}