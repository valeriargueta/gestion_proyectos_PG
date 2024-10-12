import { NgIf, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { TranslocoModule } from '@jsverse/transloco';
import { JsonServiceClient } from '@servicestack/client';
import { DinamicFormComponent, StateForm } from 'app/components/dinamic-form/dinamic-form.component';
import { FormTemplateModel } from 'app/components/dinamic-form/models/form-model';
import { DataService } from 'app/core/data/data.service';
import { Forms } from 'app/core/forms/forms';
import { Observable, Subject, map } from 'rxjs';

@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [RouterLink, TranslocoModule, NgIf, DinamicFormComponent, FuseAlertComponent, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule, NgOptimizedImage],
})
export class AuthSignUpComponent implements OnInit
{
    private _dataService = inject(DataService);
    form = signal<FormTemplateModel>({...Forms['SignUpForm']});
    stateForm = signal<StateForm>({resetForm: false});
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: '',
    };
    showAlert: boolean = false;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void
    {
    }

    signUp(): void
    {

    }
}
