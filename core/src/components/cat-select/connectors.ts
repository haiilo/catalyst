import { of } from 'rxjs';
import { CatSelectConnector } from './cat-select';

/**
 * Creates a connector that resolves local string array data.
 *
 * @param data the string array to connect to
 * @returns a connector that resolves local string array data
 */
export function stringArrayConnector(data: string[]): CatSelectConnector {
  const toItem = (id: string) => ({ id, name: id });
  return {
    resolve: ids => of(data.filter(id => ids.includes(id)).map(toItem)),
    retrieve: term =>
      of({
        content: data.filter(id => id.toLowerCase().includes(term.toLowerCase())).map(toItem),
        last: true,
        totalElements: data.length
      }),
    render: item => ({ label: item.name })
  };
}
