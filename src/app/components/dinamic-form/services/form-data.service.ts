import { Injectable, signal } from '@angular/core';
import {
    DefaultValues,
} from '../models/form-model';

@Injectable({providedIn: 'root'})
export class FormDataService {
    public dataSignal = signal<DefaultValues[]>([]);

    constructor() {}
}
