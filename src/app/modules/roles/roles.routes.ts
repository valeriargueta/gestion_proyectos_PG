import { Routes } from "@angular/router";
import { RolesComponent } from "app/modules/roles/roles.component";
import { NewRoleComponent } from "./new-role/new-role.component";
import { DataService } from "app/core/data/data.service";
import { inject } from "@angular/core";
import { RolesService } from "app/core/roles/roles.service";
import { EditRoleComponent } from "./edit-role/edit-role.component";
import { SecureIpPermissions } from "app/core/enums/permission.enum";
import { verifyPermissionGuard } from "app/core/guards/auth.guard";

export default [
  {
    path: "",
    data: {
      permission: SecureIpPermissions.ListRole,
    },
    canActivate: [verifyPermissionGuard],
    component: RolesComponent,
  },
  {
    path: "add",
    component: NewRoleComponent,
    data: {
      permission: SecureIpPermissions.CreateRole,
    },
    canActivate: [verifyPermissionGuard],
    resolve: {
      permissionsList: () => inject(RolesService).getAllPermissions(),
    },
  },
  {
    path: "edit",
    data: {
      permission: SecureIpPermissions.UpdateRole,
    },
    canActivate: [verifyPermissionGuard],
    component: EditRoleComponent,
  },
] as Routes;
