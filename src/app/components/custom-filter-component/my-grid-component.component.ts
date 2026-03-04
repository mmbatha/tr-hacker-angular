import { ColDef } from 'ag-grid-community';
import { EngineStateFilterComponent } from './custom-filter-component.component';

export class MyGridComponent {
  public columnDefs: ColDef[] = [
    { field: 'vehicleName' },
    { 
      field: 'engineState', 
      filter: EngineStateFilterComponent // Your custom component
    }
  ];

  public gridOptions = {
    enableFilterHandlers: true // Recommended for custom filters in 2026
  };
}
