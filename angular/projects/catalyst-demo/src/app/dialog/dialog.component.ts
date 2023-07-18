import { Component } from '@angular/core';
import { of } from 'rxjs';

interface Country {
  id: string;
  country: string;
}

const countries: Country[] = [
  { id: '0', country: 'Afghanistan' },
  { id: '1', country: 'Albania' },
  { id: '2', country: 'Algeria' },
  { id: '3', country: 'American Samoa' },
  { id: '4', country: 'Andorra' },
  { id: '5', country: 'Angola' }
];
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  countryConnector: any = {
    resolve: (ids: string[]) => of(ids.map(id => countries.find(value => value.id === id)!)),
    retrieve: () => of({ content: countries, last: true }),
    render: (country: Country) => ({ label: country.country })
  };
}
