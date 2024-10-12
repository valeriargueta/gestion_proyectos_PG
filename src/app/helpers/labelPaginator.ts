import { Injectable, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@jsverse/transloco';
import { Subject } from 'rxjs';

@Injectable()
export class LanguagePaginatorIntl implements MatPaginatorIntl {
  private _translocoService = inject(TranslocoService);
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = this._translocoService.translate("TABLE.PAGINATOR.FIRST_PAGE");
  itemsPerPageLabel = this._translocoService.translate("TABLE.PAGINATOR.ITEMS_PER_PAGE");
  lastPageLabel = this._translocoService.translate("TABLE.PAGINATOR.LAST_PAGE");

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = this._translocoService.translate("TABLE.PAGINATOR.NEXT_PAGE");
  previousPageLabel = this._translocoService.translate("TABLE.PAGINATOR.PREVIOUS_PAGE");

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this._translocoService.translate("TABLE.PAGINATOR.PAGE_ONE_ONE");
    }
    const amountPages = Math.ceil(length / pageSize);
    return this._translocoService.translate("TABLE.PAGINATOR.PREVIOUS_PAGE", {page: (page + 1), total: amountPages }) ;
  }
}