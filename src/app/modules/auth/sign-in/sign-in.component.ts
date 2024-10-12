import { NgIf, NgOptimizedImage } from "@angular/common";
import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
  signal,
} from "@angular/core";
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertComponent, FuseAlertType } from "@fuse/components/alert";
import {
  DinamicFormComponent,
  StateForm,
} from "app/components/dinamic-form/dinamic-form.component";
import { FormTemplateModel } from "app/components/dinamic-form/models/form-model";
import { AuthService } from "app/core/auth/auth.service";
import { Forms } from "../../../core/forms/forms";
import { JsonServiceClient } from "@servicestack/client";
import { AuthenticateResponse } from "app/core/dtos/dtos";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import {
  ModalService,
  ResponseModal,
} from "app/components/dinamic-modal/services/modal.service";
import { toObservable } from "@angular/core/rxjs-interop";
import { Subject, takeUntil } from "rxjs";
import { NewTokenDialogComponent } from "./new-token-dialog/new-token-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SessionService } from "app/core/service/session.service";

@Component({
  selector: "auth-sign-in",
  templateUrl: "./sign-in.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    TranslocoModule,
    RouterLink,
    FuseAlertComponent,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    DinamicFormComponent,
  ],
})
export class AuthSignInComponent implements OnInit, OnDestroy {
  private _translocoService = inject(TranslocoService);
  private _modalService = inject(ModalService);
  private modalSignal = toObservable(this._modalService.responseModalSignal);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  form = signal<FormTemplateModel>({ ...Forms["LoginForm"] });
  formValue: any;
  stateForm = signal<StateForm>({ resetForm: false });

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _storeService: SessionService,
    private _router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Token modal response
    this.modalSignal
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: ResponseModal) => {
        if (response && response.response && this.formValue) {
          if(this.validateFormatToken(response.value)){
            this._authService
            .signIn({ ...this.formValue, accessToken: response.value })
            .then((res: AuthenticateResponse) => {
              this.stateForm.set({ resetForm: false, disableControls: false });
              if (res.sessionId) {
                this.continueLogin();
              } else {
                this.invalidCredentials(true);
              }
            });
          }
          else this.invalidCredentials(true);
          
        }
      });
  }

  validateFormatToken(token) {
    const regex = /^\d{6}$/;

    return regex.test(token);
  }
  signIn(event): void {
    this.showAlert = false;
    this.formValue = event;
    this.stateForm.set({ resetForm: false, disableControls: true });
    this._authService.signInUsingToken(this.formValue).then((response) => {
      this.stateForm.set({ resetForm: false, disableControls: false });
      switch (response.errorCode) {
        case "200":
          this._modalService.showTokenModal(
            "Ingresa el token para iniciar sesión"
          );
          break;

        case "401":
          this.invalidCredentials(true);
          break;

        case "406":
          this.invalidCredentials(true); //Blocked
          break;

        case "407":
          this.openNewTokenDialog(
            response.tokenSeed,
            event.userName,
            event.password
          );
          break;
      }
    });
  }

  invalidCredentials(showMessage: boolean) {
    this.stateForm.set({ resetForm: false, disableControls: false });

    if (showMessage) {
      // Set the alert
      this.alert = {
        type: "error",
        message: this._translocoService.translate("ALERTS.INVALID_CREDENTIALS"),
      };

      // Show the alert
      this.showAlert = true;
    }
  }

  continueLogin() {
    const redirectURL =
      this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
      "/signed-in-redirect";

    this._router.navigateByUrl(redirectURL);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  openNewTokenDialog(seed: string, email: string, password: string): void {
    const dialogRef = this.dialog.open(NewTokenDialogComponent, {
      width: "500px",
      data: { seed, email, password },
      disableClose: true,
      position: {
        top: "24px",
      },
    });
  }
}
