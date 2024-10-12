import { Routes } from "@angular/router";

import { SecureIpPermissions } from "app/core/enums/permission.enum";
import { verifyPermissionGuard } from "app/core/guards/auth.guard";
import { ProjectsComponent } from "./projects.component";

export default [
  { path: "", pathMatch: "full", redirectTo: "list" },
  {
    path: "list",
    data: {
      permission: SecureIpPermissions.ListMerchat,
    },
    canActivate: [verifyPermissionGuard],
    component: ProjectsComponent,
  },
  {
    path: "view",
    data: {
      permission: SecureIpPermissions.ListMerchat,
    },
    canActivate: [verifyPermissionGuard],
    component: ProjectsComponent,
  },
] as Routes;
