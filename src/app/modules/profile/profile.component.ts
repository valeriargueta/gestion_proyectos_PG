import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DinamicFormComponent, StateForm } from 'app/components/dinamic-form/dinamic-form.component';
import { FormTemplateModel, TypeFields } from 'app/components/dinamic-form/models/form-model';
import { FormDataService } from 'app/components/dinamic-form/services/form-data.service';
import { DataService } from 'app/core/data/data.service';
import { UserModel } from 'app/core/dtos/dtos';
import { Forms } from 'app/core/forms/forms';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { fuseAnimations } from '@fuse/animations';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-profile',
  standalone: true,
  animations: fuseAnimations,
  imports: [MatSidenavModule, NgClass, MatIconModule, DinamicFormComponent, ResetPasswordComponent, TranslocoModule, FuseAlertComponent, UpdateProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private _translocoService = inject(TranslocoService);
  simbolos: string = "";
  panels = [];
  selectedPanel: string = 'account';
  
  ngOnInit(): void {
    // Setup available panels
    this.panels = [
    {
      id         : 'account',
      title   : 'PANELS.PERSONAL_INFO',
      type    : 'basic',
      icon : 'heroicons_outline:user',
    },
    {
      id         : 'update-password',
      title   : 'PANELS.CHANGE_PASSWORD',
      type    : 'basic',
      icon : 'heroicons_outline:lock-closed',
    }];
  }

  goToPanel(panel: string): void
  {
    this.selectedPanel = panel;
  }
}
