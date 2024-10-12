import { Component, ViewEncapsulation } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
    selector     : 'home',
    standalone   : true,
    templateUrl  : './home.component.html',
    imports: [DashboardComponent],
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
