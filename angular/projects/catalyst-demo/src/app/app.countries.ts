import { of } from 'rxjs';

export interface Country {
  id: string;
  country: string;
}

export const countries: Country[] = [
  { id: '0', country: 'Afghanistan' },
  { id: '1', country: 'Albania' },
  { id: '2', country: 'Algeria' },
  { id: '3', country: 'American Samoa' },
  { id: '4', country: 'Andorra' },
  { id: '5', country: 'Germany' }
];

export const countryConnector: any = {
  resolve: (ids: string[]) => of(ids.map(id => countries.find(value => value.id === id)!)),
  retrieve: () => of({ content: countries, last: true }),
  render: (country: Country) => ({ label: country.country })
};
