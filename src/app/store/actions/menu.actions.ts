import { createActionGroup, props } from '@ngrx/store';
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