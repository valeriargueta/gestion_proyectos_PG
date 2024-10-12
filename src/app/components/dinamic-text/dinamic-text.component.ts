import { Component, Input, OnInit } from '@angular/core';
import { FormTemplateModel, TypeFields } from '../dinamic-form/models/form-model';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';

export const ViewTemplate = {
  Columns: 1,
  Form: 2
}

interface DynamicTextElement {
  code: string;
  name: string;
  value: any;
  type?: number;
  icon?: string;
}

@Component({
  selector: 'app-dinamic-text',
  standalone: true,
  imports: [MatInputModule, MatCheckboxModule, MatIconModule, TranslocoModule],
  templateUrl: './dinamic-text.component.html',
  styleUrl: './dinamic-text.component.scss'
})
export class DinamicTextComponent implements OnInit {
  @Input() inForm: FormTemplateModel;  
  @Input() dataDefault: DynamicTextElement[];
  @Input({ required: true }) view: number = ViewTemplate.Form;

  TypeFields = TypeFields;
  
  ngOnInit(): void {
    
  }

}
