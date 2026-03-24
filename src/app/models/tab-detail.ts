export interface TabDetail {
  tabId: number;
  displayName: string;
  displayTabId: string;
}

export interface UnitTab {
  [serial: string]: TabDetail[];
}

export interface MenuState {
  unitTabs: UnitTab;
  loadingSerials: string[];
  selectedSerial: string | null;
  activeTabId: string | null;
}

export interface AppState {
  menu: MenuState;
}