import { createReducer, on } from '@ngrx/store';
import { MenuState } from '../../models/tab-detail';
import { MenuActions } from '../actions/menu.actions';

export const initialState: MenuState = {
  unitTabs: {},
  loadingSerials: [],
  selectedSerial: null,
  activeTabId: null
};

export const menuReducer = createReducer(
  initialState,
  on(MenuActions.selectUnit, (state, { serial }) => ({ ...state, selectedSerial: serial })),
  on(MenuActions.loadTabs, (state, { serial }) => ({
    ...state,
    loadingSerials: [...state.loadingSerials, serial]
  })),
  on(MenuActions.loadTabsSuccess, (state, { serial, tabs }) => ({
    ...state,
    unitTabs: { ...state.unitTabs, [serial]: tabs },
    loadingSerials: state.loadingSerials.filter(id => id !== serial)
  }))
);
