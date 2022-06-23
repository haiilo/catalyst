export type ClassNames = {
  containerOuter?: string;
  containerInner?: string;
  input?: string;
  inputCloned?: string;
  list?: string;
  listItems?: string;
  listSingle?: string;
  listDropdown?: string;
  item?: string;
  itemSelectable?: string;
  itemDisabled?: string;
  itemChoice?: string;
  placeholder?: string;
  group?: string;
  groupHeading?: string;
  button?: string;
  activeState?: string;
  focusState?: string;
  openState?: string;
  disabledState?: string;
  highlightedState?: string;
  selectedState: string;
  flippedState?: string;
  loadingState?: string;
  noResults?: string;
  noChoices?: string;
};

export type ItemFilterFn = (value: string) => boolean;

export type ValueCompareFunction = (value1: string, value2: string) => boolean;
