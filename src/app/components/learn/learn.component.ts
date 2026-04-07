import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, OnInit, signal } from '@angular/core';
import { AgGridAngular, ICellRendererAngularComp } from "ag-grid-angular";
import type { CellValueChangedEvent, ColDef, GridReadyEvent, ICellRendererParams, RowSelectionOptions, SelectionChangedEvent, ValueFormatterParams } from 'ag-grid-community';
import { AppState, TabDetail } from '../../models/tab-detail';
import { Store } from '@ngrx/store';
import { selectCurrentTabs, selectIsLoadingBySerial } from '../../store/selectors/menu.selectors';
import { MenuActions } from '../../store/actions/menu.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';

interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

// Custom Cell Renderer Component
@Component({
  selector: "app-mission-result-renderer",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <span>
      @if (value()) {
        <img
          [alt]="value()"
          [src]="
            'https://www.ag-grid.com/example-assets/icons/' + value() + '.png'
          "
          [height]="30"
        />
      }
    </span>
  `,
  styles: [
    "img { width: auto; height: auto; } span {display: flex; height: 100%; justify-content: center; align-items: center} ",
  ],
})
export class MissionResultRenderer implements ICellRendererAngularComp {
  value = signal("");
  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.value.set(params.value ? "tick-in-circle" : "cross-in-circle");
    return true;
  }
}

// Custom Cell Renderer Component
@Component({
  selector: "app-company-logo-renderer",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <span>
      @if (value()) {
        <img
          [alt]="value()"
          [src]="
            'https://www.ag-grid.com/example-assets/space-company-logos/' +
            lowercase() +
            '.png'
          "
        />
        <p>{{ value() }}</p>
      }
    </span>
  `,
  styles: [
    "img {display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.2);} span {display: flex; height: 100%; width: 100%; align-items: center} p { text-overflow: ellipsis; overflow: hidden; white-space: nowrap }",
  ],
})
export class CompanyLogoRenderer implements ICellRendererAngularComp {
  value = signal("");
  lowercase = computed(() => this.value().toLowerCase());

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.value.set(params.value);
    return true;
  }
}

@Component({
  selector: 'app-learn',
  imports: [AgGridAngular, CommonModule, NzRadioModule, NzFormModule, ReactiveFormsModule],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.less'
})
export class LearnComponent implements OnInit{
  // Return formatted date value
  dateFormatter(params: ValueFormatterParams) {
    return new Date(params.value).toLocaleDateString("en-za", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  // Row Data: The data to be displayed.
  rowData: IRow[] = [];

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      field: "mission",
      width: 150,
    },
    {
      field: "company",
      width: 130,
      cellRenderer: CompanyLogoRenderer
    },
    {
      field: "location",
      width: 225,
    },
    {
      field: "date",
      valueFormatter: this.dateFormatter
    },
    {
      field: "price",
      // Convert value from dollars to rands
      valueFormatter: params => {
        const dollars = params.value as number;
        // TODO: Get current rate using https://api.frankfurter.dev/v2/rates?base=USD&quotes=ZAR
        const exchangeRate = 16.9722;
        params.value = dollars * exchangeRate;
        return 'R ' + params.value.toLocaleString();
      } // Format with inline function
    },
    {
      field: "successful",
      width: 120,
      cellRenderer: MissionResultRenderer
    },
    { field: "rocket" }
  ];

  rowSelection: RowSelectionOptions = {
    mode: "multiRow",
    headerCheckbox: false
  };

  defaultColDef: ColDef = {
    editable: true,
    filter: true
  };
  selectedSerial$: Observable<string | null>;
  tabs$: Observable<TabDetail[]>;

  validateForm!: FormGroup;

  onSelectionChanged = (event: SelectionChangedEvent) => {
    console.log("Row selected!");
  };

  // Load data into grid when ready
  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/space-mission-data.json')
      .subscribe(data => this.rowData = data);
  };

  // Handle cell editing event
  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log(`New Cell Value: ${event.value}`)
  };

  load(serial: string) {
    this.store.dispatch(MenuActions.selectUnit({ serial }));
    this.store.dispatch(MenuActions.loadTabs({ serial }));
  }

  isLoading$(serial: string) {
    return this.store.select(selectIsLoadingBySerial(serial));
  }

  submitForm(): void {
    console.log('Selected Plan:', this.validateForm.value);
  }

  constructor(private http: HttpClient, private store: Store<AppState>, private fb: FormBuilder) {
    this.selectedSerial$ = this.store.select(state => state.menu.selectedSerial);
    this.tabs$ = this.store.select(selectCurrentTabs);
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      plan: [null, [Validators.required]]
    });
  }
}
