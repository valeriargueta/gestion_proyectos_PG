import { Component, OnDestroy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from './core/loading/loading.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet, NgxSpinnerModule],
})
export class AppComponent implements OnDestroy
{    
    private _loadingService = inject(LoadingService);
    loadingObs = toObservable(this._loadingService.isLoading);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private spinner: NgxSpinnerService)
    {
        // Data to table
        this.loadingObs.pipe(takeUntil(this._unsubscribeAll))
        .subscribe(loading => {
            if(loading)
            {
                this.spinner.show();
            } else
                this.spinner.hide();
        });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
