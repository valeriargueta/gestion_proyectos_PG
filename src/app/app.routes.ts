import { Route } from "@angular/router";
import { initialDataResolver } from "app/app.resolvers";
import { LayoutComponent } from "app/layout/layout.component";
import { ProfileComponent } from "./modules/profile/profile.component";
import {
  activateUserGuard,
  activeSessionGuard,
  verifyPermissionGuard,
} from "./core/guards/auth.guard";
import { UserService } from "./core/user/user.service";
import { inject } from "@angular/core";
import { authGuard } from "./core/guards/auth.guard";
import { SecureIpPermissions } from "./core/enums/permission.enum";

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Redirect empty path to '/home'
  { path: "", pathMatch: "full", redirectTo: "home" },

  // Redirect signed-in user to the '/home'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: "signed-in-redirect", pathMatch: "full", redirectTo: "home" },

  // Auth routes for guests
  {
    path: "",
    // canActivate: [NoAuthGuard],
    canActivateChild: [authGuard],
    component: LayoutComponent,
    data: {
      layout: "empty",
    },
    children: [
      {
        path: "forgot-password",
        loadChildren: () =>
          import("app/modules/auth/forgot-password/forgot-password.routes"),
      },
      {
        path: "reset-password",
        canActivate: [activateUserGuard],
        loadChildren: () =>
          import("app/modules/auth/reset-password/reset-password.routes"),
      },
      {
        path: "sign-in",
        loadChildren: () => import("app/modules/auth/sign-in/sign-in.routes"),
      },
      {
        path: "sign-up",
        loadChildren: () => import("app/modules/auth/sign-up/sign-up.routes"),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: "",
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: "empty",
    },
    children: [
      {
        path: "unlock-session",
        loadChildren: () =>
          import("app/modules/auth/unlock-session/unlock-session.routes"),
      },
    ],
  },
  /*
    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },
*/
  // Admin routes
  {
    path: "",
    canActivate: [activeSessionGuard],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: "home",
        loadChildren: () => import("app/modules/home/home.routes"),
      },
      {
        path: "roles",
        data: {
          permission: SecureIpPermissions.ListRole,
        },
        canActivate: [verifyPermissionGuard],
        loadChildren: () => import("app/modules/roles/roles.routes"),
      },
      {
        path: "users",
        data: { permission: [SecureIpPermissions.Users, SecureIpPermissions.ListUser] },
        canActivateChild: [verifyPermissionGuard],
        loadChildren: () => import("app/modules/users/users.routes"),
      },
      {
        path: "projects",
        data: { permission: SecureIpPermissions.ListMerchat},
        loadChildren: () =>
          import("app/modules/projects/projects.routes"),
      },
      {
        path: "profile",
        component: ProfileComponent,
        resolve: {
          userSigned: () => inject(UserService).getAccount(),
        },
        
      },
    ],
  },
];
