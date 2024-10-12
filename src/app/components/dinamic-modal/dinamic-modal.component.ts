import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationConfig } from './confirmation.types';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoDecimalValidator } from '../dinamic-form/validators/noDecimalValidator';

@Component({
  selector: 'app-dinamic-modal',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, TranslocoModule, MatDialogModule, MatButtonModule],
  templateUrl: './dinamic-modal.component.html',
  styleUrl: './dinamic-modal.component.scss'
})
export class DinamicModalComponent {  
    form: FormGroup; 

    /**
     * Constructor
     */
    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationConfig,
    public dialogRef: MatDialogRef<DinamicModalComponent>,
    private fb: FormBuilder)
    {
      this.form = this.fb.group({
        token: new FormControl('', [Validators.required,Validators.maxLength(6), Validators.minLength(6), Validators.pattern(/^\d{6}$/)])
      })
    }

    sendData(response: boolean) {
      // Send the token
      // this.form.get
      if(this.data.showToken)
      {
        this.dialogRef.close({ response: response, value: this.form.controls["token"].value });
      } else
        {
          this.dialogRef.close(response);
        }
    }

}
