import { Component, OnInit, ViewEncapsulation, inject, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertComponent, FuseAlertType } from "@fuse/components/alert";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import {
  DinamicFormComponent,
  StateForm,
} from "app/components/dinamic-form/dinamic-form.component";
import { FormTemplateModel } from "app/components/dinamic-form/models/form-model";
import { ModalService } from "app/components/dinamic-modal/services/modal.service";
import { AuthService } from "app/core/auth/auth.service";
import { DataService } from "app/core/data/data.service";
import { UserModel } from "app/core/dtos/dtos";
import { Forms } from "app/core/forms/forms";
import { SessionService } from "app/core/service/session.service";
import { UserService } from "app/core/user/user.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-reset-password",
  standalone: true,
  animations: fuseAnimations,
  imports: [DinamicFormComponent, FuseAlertComponent, TranslocoModule],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
  private _translocoService = inject(TranslocoService);
  private _modalService = inject(ModalService);
  private _dataService = inject(DataService);
  private _userService = inject(UserService);
  private _sessionService = inject(SessionService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private userObs = toObservable(this._userService.userSignal);
  simbolos: string = "";
  form = signal<FormTemplateModel>({ ...Forms["UpdatePasswordForm"] });
  stateForm = signal<StateForm>({ resetForm: false });
  user: UserModel;

  ngOnInit(): void {
    this.simbolos = "!@#$!%^&*?()_+=|~`{}[]:\";'<>,./-";

   // this._userService.getAccount();

    this.userObs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: UserModel) => {
        this.user = user;
      });
  }

  updatePassword(element) {
    element["userId"] = this.user.id;
    this.stateForm.set({ resetForm: false, disableControls: true });
    this._dataService.updateUserPassword(element).then((response) => {
      if (
        response.responseStatus &&
        response.responseStatus.errorCode !== "200"
      ) {
        this._modalService.showErrorModal(
          this._translocoService.translate("ALERTS.ERROR_UPDATE_PASSWORD")
        );
      } else {
        this._modalService.showSuccessModal(
          this._translocoService.translate("ALERTS.SUCCESS_UPDATE_PASSWORD")
        );
        this._sessionService.signOut();
      }
      this.stateForm.set({ resetForm: true, disableControls: false });
    });
  }
}
