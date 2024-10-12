import { Component, OnInit, ViewChild, inject, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
import { Router, RouterLink } from "@angular/router";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import { DataTableComponent } from "app/components/data-table/data-table.component";
import { Tables } from "app/components/data-table/models/table-list";
import { DataTableService } from "app/components/data-table/services/data-table.service";
import { ConfirmationConfig } from "app/components/dinamic-modal/confirmation.types";
import {
  ModalService,
  ResponseModal,
} from "app/components/dinamic-modal/services/modal.service";
import {
  GetUsersDataResponse,
  ToggleUserStatusResponse,
} from "app/core/dtos/dtos";
import { SecureIpPermissions } from "app/core/enums/permission.enum";
import { SessionService } from "app/core/service/session.service";
import { UserService } from "app/core/user/user.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [
    DataTableComponent,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    TranslocoModule,
  ],
  templateUrl: "./users.component.html",
  styleUrl: "./users.component.scss",
})
export class UsersComponent {
  private _userService = inject(UserService);
  private _translocoService = inject(TranslocoService);
  private _dataTableService = inject(DataTableService);
  private _modalService = inject(ModalService);
  private modalSignal = toObservable(this._modalService.responseModalSignal);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  table = Tables["Users"];
  dataUsers: any[];
  selectedUser: any;
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  private router = inject(Router);
  dataCount: number = 0;
  canCreateUser: boolean = false;
  displayName: string = '';

  constructor(private sessionService: SessionService) {
   
  }

  ngOnInit(): void {
    this.canCreateUser = this.sessionService.hasPermission(SecureIpPermissions.CreateUser);
    this.getUsers();
    // Modal response
    this.modalSignal
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: ResponseModal) => {
        if (response && response.response)
          this._userService
            .updateUserStatus({
              id: this.selectedUser.id,
            })
            .then((res: ToggleUserStatusResponse) => {
              if (res.responseStatus.errorCode == "200") {
                this.getUsers();
              }
            });
      });
  }

  getUsers(page: number = 0, itemsPerPage: number = 10, ) {
    this._userService
      .getUsers(page, itemsPerPage,this.displayName)
      .then((res: GetUsersDataResponse) => {
        console.log(res);
        if (res.users && res.users.length > 0) {
          let usersArray = [];
          res.users.forEach((user) => {
            usersArray.push({
              id: user.id,
              name: user.displayName,
              role: user.roles,
              status: user.status,
            });
          });
          this.dataUsers = usersArray;
          this._dataTableService.dataTableSignal.set(usersArray);
          this.dataCount = res.totalItems;
        }
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });
  }

  userFiltered(event){
    console.log(event)
    this.displayName = event;
    this.getUsers();
  
  }

  activateDeactivateUser(response) {
    let element = response.element;
    this.selectedUser = element;
    let configActivate: ConfirmationConfig;
    if (element.status) {
      configActivate = {
        title: this._translocoService.translate("USERS.DEACTIVATE_USER_TITLE"),
        message:
          this._translocoService.translate("USERS.DEACTIVATE_USER") +
          " <b>" +
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
        title: this._translocoService.translate("USERS.ACTIVATE_USER_TITLE"),
        message:
          this._translocoService.translate("USERS.ACTIVATE_USER") +
          " <b>" +
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

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  editUser(id): void {
    this.router.navigateByUrl('users/edit', { state: { id } });
  }

  async paginationHandler(event) {
    this.getUsers(event.page, event.size);
  }
}
