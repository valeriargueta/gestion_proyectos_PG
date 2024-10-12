import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { TranslocoService } from '@jsverse/transloco';
import { DinamicFormComponent, StateForm } from 'app/components/dinamic-form/dinamic-form.component';
import { FormTemplateModel } from 'app/components/dinamic-form/models/form-model';
import { FormDataService } from 'app/components/dinamic-form/services/form-data.service';
import { DataService } from 'app/core/data/data.service';
import { GetLanguagesResponse, GetTimeZonesResponse, UserModel } from 'app/core/dtos/dtos';
import { Forms } from 'app/core/forms/forms';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  animations: fuseAnimations,
  imports: [DinamicFormComponent, FuseAlertComponent],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class UpdateProfileComponent implements OnInit {
  private _translocoService = inject(TranslocoService);
  private _userService = inject(UserService);
  private _dataFormService = inject(FormDataService);
  private _dataService = inject(DataService);
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private userObs = toObservable(this._userService.userSignal);
  form = signal<FormTemplateModel>({...Forms['ProfileForm']});
  stateForm = signal<StateForm>({resetForm: false});  
  alert: { type: FuseAlertType; message: string } = {
      type   : 'success',
      message: '',
  };
  showAlert: boolean = false;
  private _usersService = inject(UserService);
  private _timeZones: any[];
  private _checkedTimeZone: string;
  private _languages: any[];
  private _checkedLanguage: string;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    
 

    // Get the user info
    this.userObs.pipe(takeUntil(this._unsubscribeAll))
    .subscribe((user: UserModel) =>
    {
      let arrayDefault = [];
      for (let prop in user) {
          arrayDefault.push({Key: prop, Value: user[prop]});
          this._checkedTimeZone = user.timeZone;
          this._checkedLanguage = user.language;
         
      }
      this._dataFormService.dataSignal.set(arrayDefault);
      this._changeDetectorRef.markForCheck();
    });
    this.getLanguages();
    this.getTimeZones();
  }

  updateAccount(element) {
    
    this.showAlert = false;
    let user = element as UserModel;
    this.stateForm.set({resetForm: false, disableControls: true});
     this._dataService.updateAccount(user).then(response => {
      if(response.responseStatus.errorCode !== "200")
       {
         // Set the alert
         this.alert = {
            type   : 'error',
           message: this._translocoService.translate("ALERTS.ERROR"),
         };
       } else {
        this._usersService.getAccount()
        const lang = user.language.substring(0, 2);
        this._translocoService.setActiveLang(lang); //set language
         //Set the alert
         this.alert = {
             type   : 'success',
             message: this._translocoService.translate("ALERTS.SUCCESS_UPDATE_INFO"),
         };
       } 
       // Show the alert
       this.showAlert = true;
       this.stateForm.set({resetForm: false, disableControls: false});
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

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }

  updateFormValues() {
    if (!this._timeZones || !this._languages) return;
    const formValue = this.form();
   
    const timeZoneField = formValue.Fields.find((field) => field.Code === "timeZone");
    const languageField = formValue.Fields.find((field) => field.Code === "language");

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
