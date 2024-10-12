import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from "@angular/material/tree";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import {
  DataTreeComponent,
  TodoItemNode,
} from "app/components/data-tree/data-tree.component";
import { ModalService } from "app/components/dinamic-modal/services/modal.service";
import { DataService } from "app/core/data/data.service";
import { PermissionModel } from "app/core/dtos/dtos";
import { SecureIpPermissions } from "app/core/enums/permission.enum";
import { RolesService } from "app/core/roles/roles.service";
import { SessionService } from "app/core/service/session.service";
import { BehaviorSubject, Observable, Subject, map, takeUntil } from "rxjs";

@Component({
  selector: "app-new-role",
  standalone: true,
  imports: [
    DataTreeComponent,
    ReactiveFormsModule,
    TranslocoModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: "./new-role.component.html",
  styleUrl: "./new-role.component.scss",
})
export class NewRoleComponent implements OnInit, OnDestroy {
  private _dataService = inject(DataService);
  private _modalService = inject(ModalService);
  private _translocoService = inject(TranslocoService);
  private router = inject(Router);
  permissionsBS = new BehaviorSubject<TodoItemNode[]>([]);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  selectedPermissions: { id: number }[] = [];
  form: FormGroup;
  private _rolesService = inject(RolesService);
  canCreateRole: boolean = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.canCreateRole = this.sessionService.hasPermission(
      SecureIpPermissions.CreateRole
    );
    this.form = this.fb.group({
      name: ["", [Validators.required]]
    });

    // Get the permissions
    this.activatedRoute.data
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ permissionsList }) => {
        this.generateTreePermission(permissionsList.permissions);
      });
  }

  generateTreePermission(permissions) {
    var treePermission: TodoItemNode[] = [];
    
    if (permissions.length > 0) {
      permissions.forEach((permission) => {
        if (permission.parent === undefined) {
          treePermission.push({
            id: permission.id,
            item: permission.name,
            children: [],
          });
        } else {
          var parent = this.findById(treePermission, permission.parent);
          if (parent.children === undefined) {
            parent.children = [];
          }
          parent.children.push({
            id: permission.id,
            item: permission.name,
            children: [],
          });
        }
      });
    }
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
    }
  }

  redirectToIndex() {
    this.router.navigate(["/roles"]);
  }

  saveRole() {
    const roleName = this.form.get("name").value;

    this._rolesService
      .createRole({
        name: roleName,
        permissions: this.selectedPermissions.map((p) => p.id),
      })
      .then((res) => {
        if (res.responseStatus.errorCode == "200") {
          this._modalService.showSuccessModal(
            this._translocoService.translate("ROLES.SUCCESS")
          );
          this.redirectToIndex();
        }
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
