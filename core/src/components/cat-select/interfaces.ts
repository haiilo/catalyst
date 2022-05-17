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

export type WeightedField = {
  [key: string]: never;
  weight: number;
};

export type FuseOptions = {
  id?: string;
  caseSensitive?: boolean;
  includeMatches?: boolean;
  includeScore?: boolean;
  shouldSort?: boolean;
  keys?: Array<string> | Array<object> | Array<WeightedField>;
  verbose?: boolean;
  tokenize?: boolean;
  tokenSeparator?: RegExp;
  matchAllTokens?: boolean;
  location?: number;
  distance?: number;
  threshold?: number;
  maxPatternLength?: number;
  minMatchCharLength?: number;
  findAllMatches?: boolean;
  sortFn?(a: { score: number }, b: { score: number }): number;
  getFn?(obj: never, path: string): never;
};

export type ItemFilterFn = (value: string) => boolean;

export type NoResultsTextFn = () => string;

export type NoChoicesTextFn = () => string;

export type AddItemTextFn = ((value: string) => string) | string;

export type MaxItemTextFn = (maxItemCount: number) => string;

export type SortFn = (el1: never, el2: never) => number;

export type UniqueItemText = ((value: string) => string) | string;
export type CustomAddItemText = ((value: string) => string) | string;

export type OnInit = () => void;

export type OnCreateTemplates = (template: unknown) => never;

export type ValueCompareFunction = (value1: string, value2: string) => boolean;
