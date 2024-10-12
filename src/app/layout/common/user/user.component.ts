import { BooleanInput } from "@angular/cdk/coercion";
import { NgClass, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  effect,
  inject,
  signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { Router, RouterLink } from "@angular/router";
import { TranslocoModule } from "@jsverse/transloco";
import { IAuthSession } from "@servicestack/client";
import { AuthService } from "app/core/auth/auth.service";
import { SessionService } from "app/core/service/session.service";
import { UserService } from "app/core/user/user.service";
import { User } from "app/core/user/user.types";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "user",
  templateUrl: "./user.component.html",
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: "user",
  standalone: true,
  imports: [
    MatButtonModule,
    TranslocoModule,
    MatMenuModule,
    NgIf,
    MatIconModule,
    NgClass,
    MatDividerModule,
    RouterLink,
  ],
})
export class UserComponent implements OnInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_showAvatar: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */
  userSession: IAuthSession;
  private _storeService = inject(SessionService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _authService = inject(AuthService);
  user = signal<IAuthSession>(null);
  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _userService: UserService,
    private _sessionService: SessionService
  ) {
    effect(
      () => {
        this.user.set(this._sessionService.userSession());
      },
      { allowSignalWrites: true }
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign out
   */
  signOut(): void {
    this._authService.signOut();
    this._sessionService.signOut();
  }
}
