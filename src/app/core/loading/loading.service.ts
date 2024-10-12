import { inject, Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingService
{
    isLoading = signal<boolean>(false);
    
    /**
     * Constructor
     */
    constructor()
    {
       
    }
}
