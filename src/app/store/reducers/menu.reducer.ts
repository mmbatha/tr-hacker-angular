import { createReducer, on } from '@ngrx/store';
import { MenuState } from '../../models/tab-detail';
import { loadMenuFailure, loadMenuSuccess, MenuActions, selectRole } from '../actions/menu.actions';

export const initialState: MenuState = {
  unitTabs: {},
  loadingSerials: [],
  selectedSerial: null,
  activeTabId: null,
  role: null,
  menuItems: [],
  loading: false,
  error: null
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
  })),
  on(selectRole, (state, { role }) => ({ ...state, role, loading: true })),
  on(loadMenuSuccess, (state, { menuItems }) => ({ ...state, menuItems, loading: false })),
  on(loadMenuFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
