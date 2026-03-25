import { createSelector } from '@ngrx/store';
import { AppState, MenuState } from '../../models/tab-detail';

export const selectMenuState = (state: AppState) => state.menu;

export const selectIsLoadingBySerial = (serial: string) => createSelector(
  selectMenuState,
  (state: MenuState) => state.loadingSerials.includes(serial)
);

export const selectCurrentTabs = createSelector(
  selectMenuState,
  (state: MenuState) => state.selectedSerial ? state.unitTabs[state.selectedSerial] || [] : []
);

export const selectActiveTab = createSelector(
  selectCurrentTabs, // Tabs for current serial
  (state: AppState) => state.menu.activeTabId,
  (tabs, activeId) => {
    // 1. Try to find the exact tab the user was just looking at
    const found = tabs.find(t => t.displayTabId === activeId);
    
    // 2. Fallback: If the previous tab doesn't exist in this unit, 
    // default to the first tab (e.g., the common one).
    return found || tabs[0] || null;
  }
);

export const selectActiveTabViewModel = createSelector(
  selectCurrentTabs,
  (state: AppState) => state.menu.activeTabId,
  (tabs, requestedId) => {
    const found = tabs.find(t => t.displayTabId === requestedId);
    
    return {
      activeTab: found || tabs[0] || null,
      isShowingFallback: !!requestedId && !found && tabs.length > 0,
      requestedId
    };
  }
);

export const selectAllMenuItems = createSelector(
  selectMenuState,
  (state) => state.menuItems
);

export const selectIsLoading = createSelector(
  selectMenuState,
  (state) => state.loading
);
