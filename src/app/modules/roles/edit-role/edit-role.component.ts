import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import {
  DataTreeComponent,
  TodoItemNode,
} from "app/components/data-tree/data-tree.component";
import { ModalService } from "app/components/dinamic-modal/services/modal.service";
import { DataService } from "app/core/data/data.service";
import { RolesService } from "app/core/roles/roles.service";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { GetRoleDataResponse, UpdateRoleDataResponse } from "app/core/dtos/dtos";
import { SecureIpPermissions } from "app/core/enums/permission.enum";
import { SessionService } from "app/core/service/session.service";

@Component({
  selector: "app-edit-role",
  standalone: true,
  imports: [
    DataTreeComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: "./edit-role.component.html",
  styleUrls: ["./edit-role.component.scss"],
})
export class EditRoleComponent implements OnInit, OnDestroy {
  private _modalService = inject(ModalService);
  private _translocoService = inject(TranslocoService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _rolesService = inject(RolesService);
  permissionsBS = new BehaviorSubject<TodoItemNode[]>([]);
  selectedPermissions: { id: number }[] = [];
  preSelectedPermissions: BehaviorSubject<{ id: number }[]> =
    new BehaviorSubject<{ id: number }[]>([]);
  form: FormGroup;
  roleId: number;
  canEditRole: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router, private sessionService: SessionService
  ) {
    this.roleId = history.state?.id;
    this.getRole(this.roleId);
  }

  ngOnInit(): void {
    this.canEditRole = this.sessionService.hasPermission(SecureIpPermissions.UpdateRole);
    this.form = this.fb.group({
      name: ["", [Validators.required]],
    });
  }

  generateTreePermission(permissions) {
    const treePermission: TodoItemNode[] = [];

    // create a map for father and childrens
    const permissionMap = new Map<number, TodoItemNode>();

    permissions.forEach((permission) => {
      const node: TodoItemNode = {
        id: permission.id,
        item: permission.name,
        children: [],
      };
      permissionMap.set(permission.id, node);

      if (permission.parent === undefined) {
        treePermission.push(node);
      } else {
        const parent = permissionMap.get(permission.parent);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    this.permissionsBS.next(treePermission);
  }

  findById(array, id) {
    for (const item of array) {
      if (item.id === id) return item;
      if (item.children?.length) {
        const innerResult = this.findById(item.children, id);
        if (innerResult) return innerResult;
      }
    }
  }

  getSelectedPermissions(event) {
    this.selectedPermissions = [];
    if (Array.isArray(event) && event.length > 0) {
      event.forEach((p) => {
        this.selectedPermissions.push({ id: p.id });
      });
    } else {
      console.log("No permissions selected");
    }
  }

  redirectToIndex() {
    this.router.navigate(["/roles"]);
  }

  updateRole() {
    const roleName = this.form.get("name").value;
    this._rolesService
      .updateRoleData({
        id: this.roleId,
        name: roleName,
        permissions: this.selectedPermissions.map((p) => p.id),
      })
      .then((res: UpdateRoleDataResponse) => {
        if (res.responseStatus.errorCode === "200") {
          this._modalService.showSuccessModal(
            this._translocoService.translate("ROLES.EDIT_SUCCESS")
          );
          this.redirectToIndex();
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  getRole(id: number) {
    this._rolesService
      .getRole(id)
      .then((res: GetRoleDataResponse) => {
        if (res && res.permissions) {
          this.generateTreePermission(res.permissions);
          this.preSelectedPermissions.next(
            res.grantedPermissions.map((gp) => {
              return { id: gp };
            })
          );
        }
        if (res && res.role) {
          this.form.patchValue({ name: res.role.name });
        }
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching role: ", error);
      });
  }
}
