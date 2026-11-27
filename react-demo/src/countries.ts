import { objectArrayConnector } from '@haiilo/catalyst';

export interface Country {
  id: string;
  label: string;
}

export const countries: Country[] = [
  { id: '0', label: 'Afghanistan' },
  { id: '1', label: 'Albania' },
  { id: '2', label: 'Algeria' },
  { id: '3', label: 'American Samoa' },
  { id: '4', label: 'Andorra' },
  { id: '5', label: 'Germany' }
];

export const countryConnector = objectArrayConnector(countries);
