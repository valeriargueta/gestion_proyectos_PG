import { Component, OnInit, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import {
  DinamicFormComponent,
  StateForm,
} from "app/components/dinamic-form/dinamic-form.component";
import {
  FormTemplateModel,
  TypeFields,
} from "app/components/dinamic-form/models/form-model";
import { ModalService } from "app/components/dinamic-modal/services/modal.service";
import { CreateUserDataResponse, GetLanguagesResponse, GetRolesDataResponse, GetTimeZonesResponse } from "app/core/dtos/dtos";
import { SecureIpPermissions } from "app/core/enums/permission.enum";
import { Forms } from "app/core/forms/forms";
import { RolesService } from "app/core/roles/roles.service";
import { SessionService } from "app/core/service/session.service";
import { UserService } from "app/core/user/user.service";

@Component({
  selector: "app-new-user",
  standalone: true,
  imports: [DinamicFormComponent, TranslocoModule],
  templateUrl: "./new-user.component.html",
  styleUrl: "./new-user.component.scss",
})
export class NewUserComponent implements OnInit {
  form = signal<FormTemplateModel>({ ...Forms["NewUserForm"] });
  stateForm = signal<StateForm>({ resetForm: false });
  private _modalService = inject(ModalService);
  private _translocoService = inject(TranslocoService);
  private router = inject(Router);
  private _rolesService = inject(RolesService);
  private _usersService = inject(UserService);
  TypeFields = TypeFields;
  canCreateUser: boolean;

  constructor(
    private sessionService: SessionService
    ) {
      
    }
  ngOnInit(): void {
    this.canCreateUser = this.sessionService.hasPermission(SecureIpPermissions.CreateRole)
    this.getRoles();
    this.getTimeZones();
    this.getLanguages();
  }

  redirectToIndex() {
    this.router.navigate(["/users"]);
  }

  saveUser(element) {
    console.log(element);
    this._usersService
      .createUser({
        firstName: element.name,
        lastname: element.lastName,
        email: element.email,
        roles: element.role,
        language: element.language,
        timeZone: element.timeZone
      })
      .then((res: CreateUserDataResponse) => {
        if (res.responseStatus.errorCode == "200") {
          this._modalService.showSuccessModal(
            this._translocoService.translate("USERS.SUCCESS")
          );
          this.redirectToIndex();
        }
      });
  }

  getRoles() {
    this._rolesService
      .getRoles()
      .then((res: GetRolesDataResponse) => {
        if (res.roles && res.roles.length > 0) {
          const rolesArray = res.roles.map((rol) => ({
            key: rol.id,
            value: rol.name,
          }));

          this.updateRoleOptions(rolesArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });
  }

  getTimeZones() {
    this._usersService
      .getTimeZones()
      .then((res: GetTimeZonesResponse) => {
        if (res.timeZones && res.timeZones.length > 0) {
          const timeZonesArray = res.timeZones.map((timeZone) => ({
            key: timeZone.id,
            value: timeZone.value,
          }));

          this.updateTimeZonesOptions(timeZonesArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });
  }
  
  getLanguages() {
    this._usersService
      .getLanguages()
      .then((res: GetLanguagesResponse) => {
        if (res.languages && res.languages.length > 0) {
          const languagesArray = res.languages.map((languages) => ({
            key: languages.id,
            value: languages.value,
          }));
      
          this.updateLanguagesOptions(languagesArray);
        }
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });
  }

  updateRoleOptions(rolesArray: Array<{ key: number; value: string }>) {
    const formValue = this.form();
    const roleField = formValue.Fields.find((field) => field.Code === "role");
    if (roleField) {
      roleField.Options = rolesArray;
      this.form.set(formValue);
    }
  }

  updateTimeZonesOptions(timeZonesArray: Array<{ key: string; value: string }>) {
    const formValue = this.form();
    const timeZoneField = formValue.Fields.find((field) => field.Code === "timeZone");
    if (timeZoneField) {
      timeZoneField.Options = timeZonesArray;
      this.form.set(formValue);
    }
  }
  updateLanguagesOptions(languagesArray: Array<{ key: string; value: string }>) {
    const formValue = this.form();
    const languageField = formValue.Fields.find((field) => field.Code === "language");
    if (languageField) {
      languageField.Options = languagesArray;
      this.form.set(formValue);
    }
  }
}
