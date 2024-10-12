import { Component, OnInit, inject, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { FuseAlertType } from "@fuse/components/alert";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import { DataTableComponent } from "app/components/data-table/data-table.component";
import { Tables } from "app/components/data-table/models/table-list";
import { DataTableService } from "app/components/data-table/services/data-table.service";
import { ConfirmationConfig } from "app/components/dinamic-modal/confirmation.types";
import {
  ModalService,
  ResponseModal,
} from "app/components/dinamic-modal/services/modal.service";
import { DataService } from "app/core/data/data.service";
import { GetRolesDataResponse, RoleModel, UpdateRoleStatusResponse } from "app/core/dtos/dtos";
import { SecureIpPermissions } from "app/core/enums/permission.enum";
import { RolesService } from "app/core/roles/roles.service";
import { SessionService } from "app/core/service/session.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-roles",
  standalone: true,
  imports: [
    DataTableComponent,
    TranslocoModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: "./roles.component.html",
  styleUrl: "./roles.component.scss",
})
export class RolesComponent implements OnInit {
  private _dataService = inject(DataService);
  private _rolesService = inject(RolesService);
  private _translocoService = inject(TranslocoService);
  private _modalService = inject(ModalService);
  private _dataTableService = inject(DataTableService);
  private modalSignal = toObservable(this._modalService.responseModalSignal);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private router = inject(Router);
  dataRoles: any[];
  table = Tables["Roles"];
  selectedRole: any;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlert: boolean = false;
  canCreateRole: boolean;

  constructor(
  private sessionService: SessionService
  ) {
    
  }

  ngOnInit(): void {
    this.canCreateRole = this.sessionService.hasPermission(SecureIpPermissions.CreateRole)
    this.getRoles();
    // Modal response
    this.modalSignal
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: ResponseModal) => {
        if (response && response.response) {
          this._rolesService
            .updateRoleStatus({
              id: this.selectedRole.id,
              status: !this.selectedRole.status,
            })
            .then((res: UpdateRoleStatusResponse) => {
              if (res.responseStatus.errorCode == "200") {
                this.getRoles();
              }
            });
        }
      });
  }

  getRoles() {
    this._rolesService
      .getRoles()
      .then((res: GetRolesDataResponse) => {
        console.log(res.roles);
        if (res.roles && res.roles.length > 0) {
          let rolesArray = [];
          res.roles.forEach((rol) => {
            rolesArray.push({
              id: rol.id,
              name: rol.name,
              users: rol.users,
              status: rol.status,
            });
          });
          this.dataRoles = rolesArray;
          this._dataTableService.dataTableSignal.set(rolesArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });
  }

  activateDeactivateRole(response): void {
    let element = response.element;
    this.selectedRole = element;
    let configActivate: ConfirmationConfig;
    if (element.status) {
      configActivate = {
        title: this._translocoService.translate("ROLES.DEACTIVATE_ROLE_TITLE"),
        message:
          this._translocoService.translate("ROLES.DEACTIVATE_ROLE") +
          "<b>" +
          element.name +
          "</b>",
        actions: {
          confirm: {
            show: true,
            label: this._translocoService.translate("ALERTS.OK"),
            color: "warn",
          },
          cancel: {
            show: true,
            label: this._translocoService.translate("ALERTS.CANCEL"),
          },
        },
        dismissible: true,
      };
    } else if (!element.status) {
      configActivate = {
        title: this._translocoService.translate("ROLES.ACTIVATE_ROLE_TITLE"),
        message:
          this._translocoService.translate("ROLES.ACTIVATE_ROLE") +
          "<b>" +
          element.name +
          "</b>",
        icon: {
          show: true,
          name: "heroicons_outline:check-circle",
          color: "success",
        },
        actions: {
          confirm: {
            show: true,
            label: this._translocoService.translate("ALERTS.OK"),
            color: "primary",
          },
        },
        dismissible: true,
      };
    }
    this._modalService.showConfirmModal(configActivate);
  }

  editRole(id: number): void {
    this.router.navigateByUrl('roles/edit', { state: { id } });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
