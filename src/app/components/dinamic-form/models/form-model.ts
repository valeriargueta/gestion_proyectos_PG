import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

export type FormTemplateModel = {
    Code: string;
    Index?: number;
    Fields: FieldTemplateModel[];
    Orientation: Orientation;
    Columns?: string;
    CancelButton: boolean;
    BtnText: string | undefined;
    BtnFull?: boolean;
    BtnCancelText?: string;
};

type Orientation = Orientations;

export type FieldTemplateModel = {
    Id: number;
    Code: string;
    Name: string;
    Title: string;
    FieldType: FieldTypeModel;
    DateMin?: Date;
    DateMax?: Date;
    Rules: Validators[];
    CssClass?: string;
    Index: number;
    Options?: any;
    OptionsFiltered?: any[];
    OptionsSelected?: any[];
    Icon?: string;
    IconAfter?: string;
    OptionsGrouped?: OptionsGrouped[];
    AvoidCopyPaste?: boolean;
    IsRequired: boolean;
    IsEditable: boolean;
    ValidateConfirm?: boolean;
    ValidateConfirmText?: boolean;
    ReadOnly?: boolean;
    Hidden?: boolean;
    MaxLength?: number;
    HintField?: string;
    EmitChanges?: boolean;
    insertNewValue?: boolean;
    // PermissionToInsert?: Permission;
    defaultValue?: string | number | boolean | null | undefined | Date | [];
    Value: string | number | boolean | null | undefined | Date | [];
};

export type DefaultValues = {
    Key: string;
    Value: string;
    extraInfo?: string;
};

type FieldTypeModel = {
    Name: (typeof TypeFields)[keyof typeof TypeFields];
    Multiple?: boolean;
};

export type OptionsGrouped = {
    id: number;
    name: string;
    options: any[];
};

export type FormClientModel = FormTemplateModel & {
    Id: number;
    Tag: string;
};

export type FieldClientModel = FieldTemplateModel & {
    Tag: string;
};

export const TypeFields = {
    Text: 1,
    Select: 2,
    Number: 3,
    Checkbox: 4,
    RadioButton: 5,
    Password: 6,
    Date: 7,
    Textarea: 8,
    TextIcon: 9,
    Decimal: 10,
    DecimalDollar: 11,
    RadioTextButton: 12,
    DateTime: 13,
    TextOptional: 14,
    TextFormQuestion: 15,
    TextareaQuestion: 16,
    Autocomplete: 17,
    AutocompleteSimple: 18,
    Toggle: 19,
    MultipleToggle: 20,
    AutocompleteChips: 21,
    PhoneNumber: 22,
};

export enum Orientations {
    Horizontal = 'Horizontal',
    Vertical = 'Vertical',
    Columns = 'Columns',
}
