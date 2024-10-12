import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { JsonServiceClient } from "@servicestack/client";
import { SessionService } from "../service/session.service";

export const authGuard: CanActivateFn = (route, state) => {
  const routerService = inject(Router);
  const _auth = inject(SessionService);

  if (_auth.userSession() !== null) {
    routerService.navigate(["/"]);
    return false;
  }
  return true;
};
export const activateUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (route.queryParams["t"] === undefined) {
    router.navigate(["/sign-in"]);
    return false;
  }
  return true;
};

export const activeSessionGuard: CanActivateFn | CanActivateChildFn = (
  route,
  state
) => {
  const _auth = inject(SessionService);
  const routerService = inject(Router);
  const _client = inject(JsonServiceClient);

  if (_auth.userSession() === null) {
    _auth.signOut();
    const redirectURL =
      state.url === "/sign-out" ? "" : `redirectURL=${state.url}`;
    const urlTree = routerService.parseUrl(`sign-in?${redirectURL}`);
    return routerService.navigateByUrl(urlTree);
  }

  _client.onAuthenticationRequired = async () => {
    _auth.signOut();
    const redirectURL =
      state.url === "/sign-out" ? "" : `redirectURL=${state.url}`;
    const urlTree = routerService.parseUrl(`sign-in?${redirectURL}`);
    return routerService.navigateByUrl(urlTree);
  };

  return true;
};

export const verifyPermissionGuard: CanActivateFn | CanActivateChildFn = async (
  route,
  state
) => {
  const routerService = inject(Router);
  const sessionService = inject(SessionService);
  const location = inject(Location);

  if (sessionService.userPermissions().length === 0) {
    await sessionService.getSessionPermissions();
  }

  const requiredPermissions = route.data?.permission;
  const userPermissions = sessionService.userPermissions();

  let hasPermission = false;
  if (Array.isArray(requiredPermissions)) {
    hasPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );
  } else {
    hasPermission = userPermissions.includes(requiredPermissions);
  }

  if (hasPermission) {
    return true;
  }

  routerService.navigate(["/home"]);
  return false;
};
