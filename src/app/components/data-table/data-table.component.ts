import { CommonModule, DatePipe, NgClass, NgIf } from "@angular/common";
import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  inject,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation,
  ViewChildren,
  QueryList,
  Injectable,
  ChangeDetectorRef,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatMenuModule } from "@angular/material/menu";
import { TranslocoModule } from "@jsverse/transloco";
import { toObservable } from "@angular/core/rxjs-interop";
import { DataTableService } from "./services/data-table.service";
import { Subject, takeUntil } from "rxjs";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { Router } from "@angular/router";
import { TableTypeList } from "./models/table-list";
import { MenuActionsType } from "./models/types-menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import {
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
  MatDateRangeSelectionStrategy,
} from "@angular/material/datepicker";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { LanguagePaginatorIntl } from "app/helpers/labelPaginator";
import { FuseScrollbarDirective } from "@fuse/directives/scrollbar";
import { DateAdapter, provideNativeDateAdapter } from "@angular/material/core";

export const MY_FORMATS = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
const moment = _rollupMoment || _moment;

export interface PaginationDefaults {
  length: number;
  pageSize: number;
  pageIndex: number;
}

@Injectable({ providedIn: "root" })
export class RangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  startToEndGap: number = 9;

  constructor(private _dateAdapter: DateAdapter<D>) {

  }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createDayRange(activeDate);
  }

  private _createDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, this.startToEndGap);
      return new DateRange<D>(start, end);
    }
    return new DateRange<D>(null, null);
  }

  updateGapValue(gap: number) {
    this.startToEndGap = gap;
  }
}

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [
    MatPaginatorModule,
    TranslocoModule,
    CommonModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatSortModule,
    TranslocoModule,
    MatMenuModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    NgIf,
    NgClass,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [
    DatePipe,
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: RangeSelectionStrategy,
    },
  ],
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() showSearch: boolean = true;
  @Input() showActions: boolean = false;
  @Input() showFilters: boolean = false;
  @Input() urlClick: string = "";
  @Input() actionsMenu: MenuActionsType;
  @Input({ required: true }) tableType: TableTypeList;
  @Input() isDynamic: boolean = false;
  @Output() action = new EventEmitter<any>();
  @Output() editAction = new EventEmitter<any>();
  @Output() delAction = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @Output() paginationEvent = new EventEmitter<{}>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pagination: PaginationDefaults;
  @Input() pageSizeOptions: Array<number> = [10, 25, 50];
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() dataCount: number = 0;
  @Output() dateRangeChanged = new EventEmitter<{
    fromDate: any;
    toDate: any;
  }>();
  @Output() exportHistory = new EventEmitter<any>();
  @Output() valueFilteredTable = new EventEmitter<any>();

  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  private router = inject(Router);
  private _dataTableService = inject(DataTableService);
  dataSourceObs = toObservable(this._dataTableService.dataTableSignal);
  inputData: any[] = [];
  inputDataOriginal: any[] = [];
  inputSliceData: any[] = [];
  clickeable: boolean = false;
  dataSource = new MatTableDataSource();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  displayedColumns = [];
  dateRange = new FormGroup({
    start: new FormControl(moment()),
    end: new FormControl(moment()),
  });
  filtersReady: boolean = true;
  maxDate: Date = new Date();
  filtersObs = toObservable(this._dataTableService.dataTableFilterSignal);
  stringFiltered: string = '';

  rangeSelection = inject(
    MAT_DATE_RANGE_SELECTION_STRATEGY
  ) as RangeSelectionStrategy<Date>;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.pagination = { length: 10, pageSize: 10, pageIndex: 0 };

    // Observe filters and update gap
    this.filtersObs.subscribe((gap: any) => {
      const availableGap = gap.value ?? 9;
      this.rangeSelection.updateGapValue(availableGap);
      this._changeDetectorRef.detectChanges();
    });

    // Mapea los títulos
    this.displayedColumns = this.tableType.Columns.map((c) => c.Code);

    // Url click row
    if (this.urlClick !== "") this.clickeable = true;

    // Data to table
    this.dataSourceObs
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response) => {
        if (response.length > 0) {
          this.inputSliceData = response;
          this.inputDataOriginal = response;
          this.inputData = this.inputSliceData.slice(0, this.pageSize);
          this.dataSource = new MatTableDataSource(this.inputData);
        }
      });
  }

  actionReturn(action: string, element: any) {
    switch (action) {
      case "DELETE":
      case "CANCEL":
        this.delAction.emit(element["id"]);
        break;
      case "VOID":
        this.delAction.emit({element: element["id"], action: action});
        break;
      case "EDIT":
        this.editAction.emit(element["id"]);
        break;
      case "ACTIVATE":
        this.action.emit({ element: element, action: action });
        break;
      case "HISTORY":
        this.action.emit({ element: element, action: action });
        break;
    }
  }

  searchInput(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.stringFiltered = filterValue
  }

  actionClickeable(element) {
    this.router.navigate([this.urlClick], { state: { id: element["id"] } });
  }

  filterDates() {
    const startControl = this.dateRange.controls["start"].value;
    const endControl = this.dateRange.controls["end"].value;
    const fromDate = moment(startControl).format('DD/MM/yyyy');
    const toDate = moment(endControl).format('DD/MM/yyyy');

    this.dateRangeChanged.emit({ fromDate: fromDate, toDate: toDate });
  }

  clearDates() {
    this.dateRange.controls["start"].setValue(null);
    this.dateRange.controls["end"].setValue(null);
    this.inputSliceData = this.inputDataOriginal;
    this.inputData = this.inputSliceData.slice(0, this.pageSize);
    this.dataSource = new MatTableDataSource(this.inputData);
  }

  onPageChange(event: PageEvent) {
    if (this.isDynamic) {
      this.dataCount = event.length;
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.paginationEvent.emit({
        page: event.pageIndex,
        size: event.pageSize,
      });

      this._fuseScrollbarDirectives?.forEach((directive) => {
        if (directive) directive.scrollToTop();
      });
      return;
    }
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.inputSliceData.length) {
      endIndex = this.inputSliceData.length;
    }
    this.inputData = this.inputSliceData.slice(startIndex, endIndex);
    this.dataSource = new MatTableDataSource(this.inputData);
    this.dataCount = this.inputSliceData.length;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  exportTable() {
    this.exportHistory.emit();
  }

  search(){
    this.valueFilteredTable.emit(this.stringFiltered)
   
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();

    this._dataTableService.dataTableSignal.set([]);
  }
}
