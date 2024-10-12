import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
    DefaultValues,
    FieldTemplateModel,
    TypeFields,
} from '../models/form-model';

export class FieldControlService {
    constructor() {}

    toFormGroup(fields: FieldTemplateModel[]) {
        const group: any = {};

        fields.forEach((field) => {
            let validators = [];
            let defaultValue = field.defaultValue;
            let fldValue = field.Value;
            let edit = false;

            if (field.Rules !== undefined) {
                field.Rules.forEach((rule) => {
                    validators.push(rule);
                });
            }

            // Setea maxlength si no viene definido
            if (
                field.FieldType.Name === TypeFields.Text &&
                field.MaxLength === undefined
            ) {
                field.MaxLength = 1000;
            }

            if (field.IsEditable !== undefined && !field.IsEditable)
                edit = true;
            group[field.Code] = new FormControl(
                { value: fldValue || defaultValue, disabled: edit },
                validators
            );
        });
        return new FormGroup(group);
    }
}
