import { of } from 'rxjs';
import { CatSelectConnector, RenderInfo } from './cat-select';

/**
 * Creates a connector that resolves local object array data.
 *
 * @param data the object array to connect to
 * @returns a connector that resolves local object array data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectArrayConnector<T extends { id: string } & RenderInfo = any>(data: T[]): CatSelectConnector<T> {
  return {
    resolve: ids => of(data.filter(({ id }) => ids.includes(id))),
    retrieve: term =>
      of({
        content: data.filter(({ label }) => label.toLowerCase().includes(term.toLowerCase())),
        last: true,
        totalElements: data.length
      }),
    render: item => item
  };
}

/**
 * Creates a connector that resolves local string array data.
 *
 * @param data the string array to connect to
 * @returns a connector that resolves local string array data
 */
export function stringArrayConnector(data: string[]): CatSelectConnector<{ id: string; label: string }> {
  const items = data.map(id => ({ id, label: id }));
  return objectArrayConnector(items);
}

/**
 * Creates a connector that resolves local string map data.
 *
 * @param data the string map to connect to
 * @returns a connector that resolves local string map data
 */
export function stringMapConnector(data: Map<string, string>): CatSelectConnector<{ id: string; label: string }> {
  const items = Array.from(data).map(([id, label]) => ({ id, label }));
  return objectArrayConnector(items);
}
