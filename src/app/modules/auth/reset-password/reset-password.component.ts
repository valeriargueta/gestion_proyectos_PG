import { CommonModule, NgIf } from "@angular/common";
import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  ViewEncapsulation,
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
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertComponent, FuseAlertType } from "@fuse/components/alert";
import { FuseValidators } from "@fuse/validators";
import { FormTemplateModel } from "app/components/dinamic-form/models/form-model";
import { AuthService } from "app/core/auth/auth.service";
import { Forms } from "app/core/forms/forms";
import { finalize } from "rxjs";
import {
  DinamicFormComponent,
  StateForm,
} from "app/components/dinamic-form/dinamic-form.component";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import { NgxSpinnerService } from "ngx-spinner";
import {
  RestoreUserPasswordResponse,
  ValidateRestorePasswordTokenResponse,
} from "app/core/dtos/dtos";

@Component({
  selector: "auth-reset-password",
  templateUrl: "./reset-password.component.html",
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    DinamicFormComponent,
    TranslocoModule,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink,
    CommonModule,
  ],
})
export class AuthResetPasswordComponent implements OnInit {
  private _spinnerService = inject(NgxSpinnerService);
  private _activatedRoute = inject(ActivatedRoute);
  passwordUpdated = signal<boolean>(false);
  invalidToken = signal<boolean>(false);

  form = signal<FormTemplateModel>({ ...Forms["ResetPasswordForm"] });
  stateForm = signal<StateForm>({ resetForm: false });

  resetPasswordForm: UntypedFormGroup;
  token: string = "";
  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlert: boolean = false;
  private _translocoService = inject(TranslocoService);

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * Constructor
   */
  constructor(private _authService: AuthService) {}
  ngOnInit(): void {
    // recuperar token de sesión y validar
    const token = this._activatedRoute.snapshot.queryParams["t"];
    if (token) {
      this.validateToken(token);
    }
    // mostrar mensaje de token expirado
    else this.invalidToken.set(false);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Validate token
   */
  validateToken(token: any): void {
    this._spinnerService.show("general");
    this._authService
      .validateRestorePassword(token)
      .then((response: ValidateRestorePasswordTokenResponse) => {
        if (response && response.responseStatus) {
          console.log(response);
          if (response.responseStatus.errorCode == "400") {
            this.invalidToken.set(true);
          }
        }
      })
      .catch((error) => {
        // error inesperado
        this.showValidateTokenError();
      })
      .finally(() => {
        this._spinnerService.hide("general");
      });
  }
  /**
   * Reset password
   */
  resetPassword(element: { newPassword: string }): void {
    this.token = this._activatedRoute.snapshot.queryParams["t"];
    this._authService
      .restorePassword(element.newPassword, this.token)
      .then((response: RestoreUserPasswordResponse) => {
        console.log(response);
        if (response.responseStatus.errorCode == "500") {
          this.showResetUserError();
        } else {
          // contraseña actualizada
          this.passwordUpdated.set(true);
        }
      });
  }

  showValidateTokenError(): void {
    this.alert = {
      type: "error",
      message: this._translocoService.translate(
        "RESET_PASSWORD_FORM.VALIDATE_TOKEN_ERROR"
      ),
    };
    this.showAlert = true;
  }

  showResetUserError(): void {
    this.alert = {
      type: "error",
      message: this._translocoService.translate(
        "RESET_PASSWORD_FORM.RESET_USER_ERROR"
      ),
    };
    this.showAlert = true;
  }
}
