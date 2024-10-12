import { Component, Inject, ViewEncapsulation, inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NgIf, CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { QRCodeModule } from "angularx-qrcode";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { JsonServiceClient } from "@servicestack/client";
import { Authenticate } from "app/core/dtos/dtos";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import { AuthService } from "app/core/auth/auth.service";
import { SessionService } from "app/core/service/session.service";

export interface DialogData {
  seed: string;
  email: string;
  password: string;
}

@Component({
  selector: "app-new-token-dialog",
  templateUrl: "./new-token-dialog.component.html",
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    TranslocoModule,
    CommonModule,
    MatDialogModule,
    RouterModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    QRCodeModule,
  ],
})
export class NewTokenDialogComponent {
  private _translocoService = inject(TranslocoService);
  private _signIn = inject(TranslocoService);
  step: number = 1;
  loading: boolean = false;
  tokenControl: FormControl = new FormControl("", [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern(/^\d{6}$/)]);

  constructor(
    public dialogRef: MatDialogRef<NewTokenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,

    private _snackBar: MatSnackBar,
    private client: JsonServiceClient,
    private _activatedRoute: ActivatedRoute
  ) {
    this.step = 1;
  }

  getQRLink() {
    const org = "Bpay%Console";
    const alg = "SHA1";
    const period = "30";
    const digits = "6";

    return `otpauth://totp/${org}:${this.data.email}?secret=${this.data.seed}&issuer=${org}&algorithm=${alg}&digits=${digits}&period=${period}`;
  }

  validateToken() {
    if (this.loading || !this.tokenControl.valid) return;

    let token = this.tokenControl.value;
    token = token.trim();
    this.loading = true;

    try {
      if (!/^[0-9]{6}$/i.test(token)) {
        this.loading = false;
        this._snackBar.open(
          this._translocoService.translate("TOKEN.NEW.MESSAGES.BAD_TOKEN"),
          null,
          {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "top",
          }
        );

        return;
      }
      const authenticateValues = new Authenticate({
        provider: "credentials",
        userName: this.data.email,
        password: this.data.password,
        accessToken: token,
      });

      this._authService.signIn(authenticateValues).then((response) => {
        try {
          if (response.sessionId) {
            this.sessionService .signIn(response);
            this._snackBar.open(
              this._translocoService.translate("TOKEN.NEW.MESSAGES.SUCCESS"),
              null,
              {
                duration: 3000,
                horizontalPosition: "center",
                verticalPosition: "top",
              }
            );

            const redirectURL =
              this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
              "/signed-in-redirect";

            this.router.navigateByUrl(redirectURL);
            this.dialogRef.close();
          } else {
            this._snackBar.open(
              this._translocoService.translate("TOKEN.NEW.MESSAGES.UNKNOWN"),
              null,
              {
                duration: 3000,
                horizontalPosition: "center",
                verticalPosition: "top",
              }
            );
          }
        } catch (e) {
          if (
            e.responseStatus &&
            e.responseStatus.errorCode &&
            e.responseStatus.errorCode == "Unauthorized"
          ) {
            this._snackBar.open(
              this._translocoService.translate("TOKEN.NEW.MESSAGES.BAD_TOKEN"),
              null,
              {
                duration: 3000,
                horizontalPosition: "center",
                verticalPosition: "top",
              }
            );
          }
        }
      });
    } catch (e) {
      this._snackBar.open(
        this._translocoService.translate("TOKEN.NEW.MESSAGES.UNKNOWN"),
        null,
        {
          duration: 3000,
          horizontalPosition: "center",
          verticalPosition: "top",
        }
      );

      this.tokenControl.reset();
    } finally {
      this.loading = false;
    }
  }
}
