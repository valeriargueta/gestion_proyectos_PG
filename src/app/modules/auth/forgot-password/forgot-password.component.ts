import { CommonModule } from "@angular/common";
import {
  Component,
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
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterLink } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertComponent, FuseAlertType } from "@fuse/components/alert";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import {
  DinamicFormComponent,
  StateForm,
} from "app/components/dinamic-form/dinamic-form.component";
import { FormTemplateModel } from "app/components/dinamic-form/models/form-model";
import { AuthService } from "app/core/auth/auth.service";
import { Forms } from "app/core/forms/forms";

@Component({
  selector: "auth-forgot-password",
  templateUrl: "./forgot-password.component.html",
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
export class AuthForgotPasswordComponent implements OnInit {
  private _translocoService = inject(TranslocoService);
  form = signal<FormTemplateModel>({ ...Forms["ForgotPasswordForm"] });
  stateForm = signal<StateForm>({ resetForm: false });

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlert: boolean = false;
  sentPassword = signal<boolean>(false);

  /**
   * Constructor
   */
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  sendResetLink(element): void {
    this.showAlert = false;

    this._authService.forgotPassword(element.email).then((response) => {
      this.stateForm.set({ resetForm: false, disableControls: false });
      switch (response.responseStatus.errorCode) {
        case "400":
          this.alert = {
            type: "error",
            message: response.responseStatus.message,
          };
          this.showAlert = true;
          break;
        case "500":
          this.alert = {
            type: "error",
            message: this._translocoService.translate(
              "FORGOT_PASSWORD.SEND_EMAIL_ERROR"
            ),
          };
          this.showAlert = true;
          break;

        case "200":
          this.sentPassword.set(true);
          break;
      }
    });
  }
}
