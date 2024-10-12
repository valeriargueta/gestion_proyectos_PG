import {
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
    inject,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormGroupDirective,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    FormControl,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
    FormTemplateModel,
    OptionsGrouped,
    Orientations,
    TypeFields,
    FieldTemplateModel,
    DefaultValues,
} from './models/form-model';
import { FieldControlService } from './services/field-control.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NoWhitespaceDirective } from 'app/directives/no-whitespaces.directive';
import {
    MatSlideToggleChange,
    MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PermissionDirective } from 'app/directives/permission.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormDataService } from './services/form-data.service';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

export type StateForm = {
    resetForm: boolean;
    errorsForm?: ErrorsForm[];
    disableControls?: boolean;
    executeReturn?: boolean;
    updateForm?: UpdateFieldForm[];
};

type ErrorsForm = {
    field: string;
    errors: string[];
};

export type UpdateFieldForm = {
    field: FieldTemplateModel;
    value: boolean;
    options: boolean;
};

@Component({
    selector: 'app-dinamic-form',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatChipsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatSelectModule,
        NoWhitespaceDirective,
        PermissionDirective,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        RouterLink,
        TranslocoModule
    ],
    templateUrl: './dinamic-form.component.html',
    styleUrl: './dinamic-form.component.scss',
    providers: [FieldControlService],
})
export class DinamicFormComponent implements OnInit, OnChanges {
    // separatorKeysCodes: number[] = [ENTER, COMMA];
    private fieldControlService = inject(FieldControlService);
    private _formDataService = inject(FormDataService);
    private destroyRef = inject(DestroyRef);
    dataFormObs = toObservable(this._formDataService.dataSignal);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    @ViewChildren('inputAutocomplete') inputFields: QueryList<ElementRef>;
    @ViewChild(FormGroupDirective, { static: false })
    formGroupDirective: FormGroupDirective;
    @Input({ required: true }) stateInForm: StateForm;
    @Input({ required: true }) inForm: FormTemplateModel;
    @Output() returnData = new EventEmitter();
    @Output() returnCancel = new EventEmitter();
    @Output() returnFieldChange = new EventEmitter<FieldTemplateModel>();
    @Input() visiblebtn: boolean = true; //show button

    filtered: Observable<OptionsGrouped[]>;
    lastValueSended: string = '';

    Orientations = Orientations;
    TypeFields = TypeFields;
    form: FormGroup;
    dataInForm = signal<FormTemplateModel>(undefined);

    inputTypePassword = 'password';
    errorText = signal<string>('');
    iconActioned = signal<boolean>(false);

    searchByName = signal<boolean>(false);

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.dataInForm.set(this.inForm);
        this.form = this.fieldControlService.toFormGroup(this.dataInForm().Fields);
   
        // Data to form
        this.dataFormObs.pipe(takeUntil(this._unsubscribeAll))
        .subscribe((defaultData: DefaultValues[]) =>
        {
            if(defaultData.length > 0)
            { try {
                defaultData.forEach(dato => {
                    if(this.form.controls[dato.Key] !== undefined)
                    {
                      this.form.controls[dato.Key].setValue(dato.Value);                        
                    }    
                  });
    
                  this._changeDetectorRef.markForCheck();
              } catch (error) {
              }
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.stateInForm) {
            this.registerStateForm();
        }
    }

    displayFn(field: FieldTemplateModel, value: number) {
        if (field && field.Options.length > 0) {
            const dataSelected =
                field.Options.length > 0
                    ? field.Options.find((_) => _.value === value)
                    : undefined;
            return value ? dataSelected.key : undefined;
        }
        return undefined;
    }

    filter(field: FieldTemplateModel) {
        const fld = this.inputFields.find(
            (htmlFld) => htmlFld.nativeElement.id === field.Code
        ).nativeElement.value;
        field.OptionsFiltered = this._filterSimple(fld, field);
    }

    private _filterSimple(
        value: string | number,
        field: FieldTemplateModel
    ): string[] {
        if (typeof value === 'string') {
            const filterValue = value.toLowerCase();
            return field.Options.filter((option) =>
                option.key.toLowerCase().includes(filterValue)
            );
        } else {
            return field.Options.filter((option) => option.id === value);
        }
    }

    autoCompleteSelectedSimple(event, field: FieldTemplateModel) {
        console.log(event.option);
        console.log(this.form);
        if (field.insertNewValue && !event.option.value) {
            this.returnFieldChange.emit({ ...field, Value: undefined });
        } else {
            this.form.controls[field.Code].setValue(event.option.value);
            this.returnFieldChange.emit({
                ...field,
                Value: event.option.value,
            });
        }
    }

    autoCompleteSelectedChips(event, field: FieldTemplateModel) {
        console.log(event);
        this.form.controls[field.Code].setValue(null);
        if (field.OptionsSelected.includes(event.option.value)) return;
        field.OptionsSelected.push(event.option.value);
        this.returnFieldChange.emit({
            ...field,
        });
        // this.form.controls[field.Code].setValue(event.option.value);
    }

    cleanField(field: FieldTemplateModel) {
        this.form.controls[field.Code].setValue('');
    }

    registerStateForm() {
        const state = this.stateInForm;
        if (state) {
            if (state.resetForm) {
                this.formGroupDirective
                    ? this.formGroupDirective.resetForm()
                    : '';
            }
            if (state.errorsForm) {
                state.errorsForm.forEach((err) => {
                    console.log(err);

                    this.form.controls[err.field].setErrors({
                        incorrect: { message: err.errors[0] },
                    });
                });
            }
            if (state.disableControls !== undefined) {
                state.disableControls === true
                    ? this.form.disable()
                    : this.form.enable();
            }
            if (state.executeReturn) {
                this.form.markAllAsTouched();
                if (this.form.valid)
                    this.returnData.emit(this.form.getRawValue());
                else this.returnData.emit(undefined);
            }
            if (state.updateForm) {
                state.updateForm.forEach((field) => {
                    if (field.options) {
                        this.inForm.Fields = this.inForm.Fields.map((fld) => {
                            if (fld.Code === field.field.Code) {
                                return {
                                    ...fld,
                                    Options: field.field.Options,
                                };
                            }
                            return { ...fld };
                        });
                    }
                    if (field.value) {
                        this.form.controls[field.field.Code].setValue(
                            field.field.Value
                        );
                        this.inForm.Fields = this.inForm.Fields.map((fld) => {
                            if (fld.Code === field.field.Code) {
                                return {
                                    ...fld,
                                    Value: field.field.Value,
                                };
                            }
                            return { ...fld };
                        });
                    }
                });
                console.log(state.updateForm);
                console.log(this.form);
            }
        }
    }

    getCssClases() {
        if (this.inForm.Orientation === Orientations.Horizontal) {
            return 'flex md:flex-row flex-col items-center';
        } else if (this.inForm.Orientation === Orientations.Vertical) {
            return 'flex flex-col';
        } else if (this.inForm.Orientation === Orientations.Columns) {
            return `grid grid-cols-1 sm:grid-cols-${this.inForm.Columns}`;
        }
        return '';
    }

    getCssBtnClases() {
        if (this.inForm.Orientation === Orientations.Horizontal) {
            return 'flex-row gap-2';
        } else if (this.inForm.Orientation === Orientations.Vertical) {
            return 'md:flex-row flex-col gap-2';
        } else if (this.inForm.Orientation === Orientations.Columns) {
            return `gap-2 col-start-${this.inForm.Columns}`;
        }
        return '';
    }  

    changeSelectValue(field: FieldTemplateModel, event: MatSelectChange) {
        this.form.controls[field.Code].setValue(event.value);
        if (field.EmitChanges)
            this.returnFieldChange.emit({ ...field, Value: event.value });
    }

    toggleVisibility(field) {
        this.iconActioned.set(!this.iconActioned());
        if (this.iconActioned()) this.inputTypePassword = 'text';
        else this.inputTypePassword = 'password';
    }

    cancel() {
        this.returnCancel.emit();
    }

    numberOnly(event): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            // Prevents keypress if it's not a number
            return false;
        }
        return true;
    }

    decimalOnly(event): boolean {
        console.log(event);
        const charCode = event.which ? event.which : event.keyCode;
        if (
            charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            charCode !== 46
        ) {
            // Prevents keypress if it's not a number
            return false;
        }
        return true;
    }

    validateInputValue(event, code: string) {
        let inputValue = (event.target as HTMLInputElement).value;
        console.log(inputValue);
        if (inputValue.length === 0) {
            // (event.target as HTMLInputElement).value = '0';
            this.form.controls[code].setValue(0);
        } else {
            if (inputValue[0] === '0') {
                inputValue = inputValue.slice(1);
                (event.target as HTMLInputElement).value = inputValue;
            }
        }
    }

    onCheckboxChange(event, field: FieldTemplateModel) {
        console.log(event);
        this.form.controls[field.Code].setValue(event.checked);
    }

    multipleToggleChange(
        event: MatSlideToggleChange,
        option: { key: any; value: any },
        field: FieldTemplateModel
    ) {
        console.log(event);
        if (event.checked) {
            this.form.controls[field.Code].setValue([
                ...this.form.controls[field.Code].value,
                option.key,
            ]);
        }
        if (!event.checked) {
            const indexToDel = this.form.controls[field.Code].value.findIndex(
                (idS) => idS === option.value
            );
            this.form.controls[field.Code].value.splice(indexToDel, 1);
        }
    }

    returnChipLabelSelect(value, field: FieldTemplateModel) {
        const label = field.Options.find((opt) => opt.value === value).key;
        return label;
    }

    remove(field: FieldTemplateModel, index: number) {
        field.OptionsSelected.splice(index, 1);
        this.returnFieldChange.emit({
            ...field,
        });
    }

    validatePassword() {
        // Valida que las contraseñas coincidan
        if(this.dataInForm().Code === "UpdatePasswordForm")
        {
            let newPwd = this.form.controls['newPassword'].value;
            let confirmP = this.form.controls['newPasswordConfirm'].value;

            if(newPwd !== confirmP && (newPwd !== "" && confirmP !== ""))
            {
                this.form.controls['newPasswordConfirm'].setErrors({noMatch: true});
                this._changeDetectorRef.markForCheck();
            }
        }
    }

    onSubmit() {
        this.returnData.emit(this.form.getRawValue());
    }
    
    ngAfterViewChecked(): void {
        this._changeDetectorRef.detectChanges();
    }
}
