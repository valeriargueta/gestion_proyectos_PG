import { inject, Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataTableService
{
    public dataTableSignal = signal<any[]>([]);
    public dataTableFilterSignal = signal<any>({});

    /**
     * Constructor
     */
    constructor()
    {
    }
}
