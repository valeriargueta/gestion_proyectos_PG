import { inject, Injectable, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { ConfirmationConfig } from '../confirmation.types';
import { DinamicModalComponent } from '../dinamic-modal.component';
import { TranslocoService } from '@jsverse/transloco';
import { NewTokenDialogComponent } from 'app/modules/auth/sign-in/new-token-dialog/new-token-dialog.component';

export interface ResponseModal
{
    response: boolean;
    value?: string;
}

@Injectable({providedIn: 'root'})
export class ModalService
{    
    private _translocoService = inject(TranslocoService);
    private _matDialog: MatDialog = inject(MatDialog);
    public responseModalSignal = signal<ResponseModal>(null);
    private _warningConfirmConfig: ConfirmationConfig = {
        title      : this._translocoService.translate("ALERTS.CONFIRM_TITLE"),
        message    : this._translocoService.translate("ALERTS.CONFIRM_GENERAL"),
        icon       : {
            show : true,
            name : 'heroicons_outline:exclamation-triangle',
            color: 'warn',
        },
        actions    : {
            confirm: {
                show : true,
                label: this._translocoService.translate("ALERTS.OK"),
                color: 'warn',
            },
            cancel : {
                show : true,
                label: this._translocoService.translate("ALERTS.CANCEL"),
            },
        },
        dismissible: false,
    };

    private _successConfig: ConfirmationConfig = {
        title      : this._translocoService.translate("ALERTS.SUCCESS_TITLE"),
        message    : this._translocoService.translate("ALERTS.SUCCESS_GENERAL"),
        icon       : {
            show : true,
            name : 'heroicons_outline:check-circle',
            color: 'success',
        },
        actions    : {
            confirm: {
                show : true,
                label: this._translocoService.translate("ALERTS.OK"),
                color: 'primary',
            },
            cancel : {
                show : false,
                label: this._translocoService.translate("ALERTS.CANCEL")
            },
        },
        dismissible: false,
    };

    private _errorConfig: ConfirmationConfig = {
        title      : this._translocoService.translate("ALERTS.ERROR_TITLE"),
        message    : this._translocoService.translate("ALERTS.ERROR_GENERAL"),
        icon       : {
            show : true,
            name : 'heroicons_outline:x-mark',
            color: 'error',
        },
        actions    : {
            confirm: {
                show : true,
                label: this._translocoService.translate("ALERTS.OK"),
                color: 'warn',
            },
            cancel : {
                show : false,
            },
        },
        dismissible: false,
    };

    private _tokenConfig: ConfirmationConfig = {
        message    : this._translocoService.translate("ALERTS.TOKEN_GENERAL"),
        icon       : {
            show : false
        },
        actions    : {
            confirm: {
                show : true,
                label: this._translocoService.translate("ALERTS.OK"),
                color: 'primary',
            },
            cancel : {
                show : true,
                label: this._translocoService.translate("ALERTS.CANCEL"),
            },
        },
        showToken: true,
        dismissible: false
    };

    /**
     * Constructor
     */
    constructor()
    {
    }

    showConfirmModal(config: ConfirmationConfig = {})
    {
        const userConfig = merge({}, this._warningConfirmConfig, config);

        this._matDialog.open(DinamicModalComponent, {
            autoFocus   : false,
            disableClose: !userConfig.dismissible,
            data        : userConfig,
            panelClass  : 'confirmation-dialog-panel',
        }).afterClosed().subscribe((result) =>
            {
                if(result)
                    this.responseModalSignal.set({ response: true });
                else
                    this.responseModalSignal.set({ response: false });
            });
    }

    showSuccessModal(message: string)
    {
        let userConfig = this._successConfig;
        userConfig.message = message;

        this._matDialog.open(DinamicModalComponent, {
            autoFocus   : false,
            data        : userConfig,
            panelClass  : 'confirmation-dialog-panel',
        });
    }

    showErrorModal(message: string)
    {
        let userConfig = this._errorConfig;
        userConfig.message = message;

        this._matDialog.open(DinamicModalComponent, {
            autoFocus   : false,
            data        : userConfig,
            panelClass  : 'confirmation-dialog-panel',
        });
    }

    showTokenModal(message: string)
    {
        let userConfig = this._tokenConfig;
        userConfig.message = message;

        this._matDialog.open(DinamicModalComponent, {
            autoFocus   : false,
            data        : userConfig,
            panelClass  : 'confirmation-dialog-panel',
        })
        .afterClosed().subscribe((result) =>
        {
            if(result.response)
                this.responseModalSignal.set(result);
            else
                this.responseModalSignal.set({ response: false });
        });
    }
    showConfigureTokenModal(seed: string, email: string, password: string)
    {

        this._matDialog.open(NewTokenDialogComponent, {
            width: '400px',
            height: '506px',
            data: { seed, email, password },
            disableClose: true,
            position: {
                top: '24px'
            }
        })
       
    }
}
