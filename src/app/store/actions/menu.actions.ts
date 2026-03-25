import { createAction, createActionGroup, props } from '@ngrx/store';
import { TabDetail } from '../../models/tab-detail';

export const MenuActions = createActionGroup({
  source: 'Menu',
  events: {
    'Load Tabs': props<{ serial: string }>(),
    'Load Tabs Success': props<{ serial: string; tabs: TabDetail[] }>(),
    'Load Tabs Failure': props<{ serial: string; error: any }>(),
    'Select Unit': props<{ serial: string }>()
  }
});

export const selectRole = createAction(
  '[Home] Select Role', 
  props<{ role: 'Admin' | 'Faculty' | 'Student' }>()
);

export const loadMenuSuccess = createAction(
  '[API] Load Menu Success', 
  props<{ menuItems: any[] }>()
);

export const loadMenuFailure = createAction(
  '[API] Load Menu Failure', 
  props<{ error: string }>()
);