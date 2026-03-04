import { Component } from '@angular/core';
import { IFilterAngularComp } from 'ag-grid-angular';
import { IFilterParams, IDoesFilterPassParams } from 'ag-grid-community';

@Component({
  selector: 'engine-state-filter',
  template: `
    <div style="padding: 10px; display: flex; flexDirection: column;">
      <strong>Engine States</strong>
      <div *ngFor="let state of allStates" style="margin-top: 5px;">
        <label>
          <input type="checkbox" [checked]="selectedStates.has(state)" 
                 (change)="onToggle(state)"> {{state}}
        </label>
      </div>
    </div>
  `
})
export class EngineStateFilterComponent implements IFilterAngularComp {
  params!: IFilterParams;
  allStates = ['Running', 'Idle', 'Stopped', 'Fault'];
  selectedStates = new Set<string>(['Running', 'Idle', 'Stopped', 'Fault']);

  agInit(params: IFilterParams): void {
    this.params = params;
  }

  // Returns true if the row data passes the current filter state
  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const value = this.params.getValue(params.node);
    return this.selectedStates.has(value);
  }

  // Return true if any filter is active (i.e., not all states are selected)
  isFilterActive(): boolean {
    return this.selectedStates.size !== this.allStates.length;
  }

  onToggle(state: string) {
    if (this.selectedStates.has(state)) {
      this.selectedStates.delete(state);
    } else {
      this.selectedStates.add(state);
    }
    // Notify the grid that the filter has changed
    this.params.filterChangedCallback();
  }

  // Mandatory methods for get/set state
  getModel() { return this.isFilterActive() ? Array.from(this.selectedStates) : null; }
  setModel(model: any) { this.selectedStates = new Set(model || this.allStates); }
}
