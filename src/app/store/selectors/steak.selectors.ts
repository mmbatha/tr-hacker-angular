import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SteakState } from '../reducers/steak.reducer';

export const selectSteakState = createFeatureSelector<SteakState>('steak');

// Example selectors
export const selectIdentity = createSelector(
  selectSteakState,
  (state) => state.identity
);

export const selectSelectedDeliveryVehicle = createSelector(
  selectSteakState,
  (state) => state.selectedDeliveryVehicle
);

export const selectSelectedDeliveryVehicleEmergencyContacts = createSelector(
  selectSteakState,
  (state) => state.selectedDeliveryVehicleEmergencyContacts
);

export const selectSelectedNonPhantomUnit = createSelector(
  selectSteakState,
  (state) => state.selectedNonPhantomUnit
);

export const selectSelectedSteakEvent = createSelector(
  selectSteakState,
  (state) => state.selectedSteak
);

export const selectSelectedSteakTheft = createSelector(
  selectSteakState,
  (state) => state.selectedSteakTheft
);