import { CommonModule } from "@angular/common";
import { Component, OnInit, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import { DinamicFormComponent } from "app/components/dinamic-form/dinamic-form.component";
import {
  FormTemplateModel,
} from "app/components/dinamic-form/models/form-model";
import { ModalService } from "app/components/dinamic-modal/services/modal.service";
import {
  GetLanguagesResponse,
  GetRolesDataResponse,
  GetTimeZonesResponse,
  GetUserDataResponse,
  UpdateUserDataResponse,
} from "app/core/dtos/dtos";
import { SecureIpPermissions } from "app/core/enums/permission.enum";
import { Forms } from "app/core/forms/forms";
import { RolesService } from "app/core/roles/roles.service";
import { SessionService } from "app/core/service/session.service";
import { UserService } from "app/core/user/user.service";

@Component({
  selector: "app-edit-user",

  standalone: true,
  imports: [DinamicFormComponent, TranslocoModule, CommonModule],
  templateUrl: "./edit-user.component.html",
  styleUrl: "./edit-user.component.scss",
})
export class EditUserComponent implements OnInit {
  // properties
  userId: number;
  form: any;

  private _modalService = inject(ModalService);
  private _translocoService = inject(TranslocoService);
  private _router = inject(Router);
  private _rolesService = inject(RolesService);
  private _usersService = inject(UserService);
  private _name: string;
  private _lastName: string;
  private _email: string;
  private _checkedRoles: any[];
  private _roles: any[];
  private _timeZones: any[];
  private _checkedTimeZone: string;
  private _languages: any[];
  private _checkedLanguage: string;
  canEditUser: boolean = false

  constructor(private sessionService: SessionService) {
    this.userId = history.state?.id;
    this.getUserData(this.userId);
  }

  ngOnInit(): void {
    this.getTimeZones();
    this.getRoles();
    this.getLanguages();
    this.canEditUser = this.sessionService.hasPermission(SecureIpPermissions.UpdateUser);

  }

  redirectToIndex() {
    this._router.navigate(["/users"]);
  }

  updateUser(element) {
    this._usersService
      .updateUser({
        id: this.userId,
        firstName: element.name,
        lastname: element.lastName,
        roles: element.role,
        language: element.language,
        timeZone: element.timeZone
      })
      .then((res: UpdateUserDataResponse) => {
        if (res.responseStatus.errorCode == "200") {
          this._modalService.showSuccessModal(
            this._translocoService.translate("USERS.EDIT_SUCCESS")
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
            key: rol.id.toString(),
            value: rol.name,
          }));
          this._roles = rolesArray;
          this.updateFormValues();
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
          this._timeZones = timeZonesArray;
          this.updateFormValues();
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
          this._languages = languagesArray;
          this.updateFormValues();
        }
      })
      .catch((error) => {
        console.error("Error fetching roles: ", error);
      });
  }

  getUserData(id: number) {
    this._usersService
      .getUserData(id)
      .then((res: GetUserDataResponse) => {
        if (res) {
          console.log(res);
          this._name = res.user.firstName;
          this._lastName = res.user.lastName;
          this._email = res.user.email;
          this._checkedRoles = res.user.roles;
          this._checkedTimeZone = res.user.timeZone
          this._checkedLanguage = res.user.language
          this.updateFormValues();
        }
      })
      .catch((error) => {
        console.error("Error fetching role: ", error);
      });
  }

  updateFormValues() {
    if (!this._name || !this._roles || !this._timeZones || !this._languages) return;

    this.form = signal<FormTemplateModel>({ ...Forms["EditUserForm"] });

    const formValue = this.form();
    const nameField = formValue.Fields.find((field) => field.Code === "name");
    const lastNameField = formValue.Fields.find(
      (field) => field.Code === "lastName"
    );
    const emailField = formValue.Fields.find((field) => field.Code === "email");
    const roleField = formValue.Fields.find((field) => field.Code === "role");
    const timeZoneField = formValue.Fields.find((field) => field.Code === "timeZone");
    const languageField = formValue.Fields.find((field) => field.Code === "language");
    if (nameField) {
      nameField.Value = this._name;
    }
    if (lastNameField) {
      lastNameField.Value = this._lastName;
    }
    if (emailField) {
      emailField.Value = this._email;
    }
    if (roleField) {
      roleField.Options = this._roles;
      roleField.Value = this._checkedRoles;
    }
    if (timeZoneField) {
      timeZoneField.Options = this._timeZones;
      timeZoneField.Value = this._checkedTimeZone;
    }
    if (languageField) {
      languageField.Options = this._languages;
      languageField.Value = this._checkedLanguage;
    }
    this.form.update(() => formValue);
  }
}
