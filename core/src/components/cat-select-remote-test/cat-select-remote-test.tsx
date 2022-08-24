import { Component, h } from '@stencil/core';
import { of, delay } from 'rxjs';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  desc: string;
}

@Component({
  tag: 'cat-select-remote-test',
  shadow: true
})
export class CatSelectRemoteTest {
  private select?: HTMLCatSelectRemoteElement;

  componentDidLoad(): void {
    this.select?.connect({
      resolve: (ids: string[]) => {
        console.info(`Resolving data... (${ids.join(', ')})`);
        return of(
          ids.map(id => ({
            id,
            firstName: 'John',
            lastName: `Doe (${id})`,
            desc: 'resolved'
          }))
        ).pipe(delay(500));
      },
      retrieve: (term: string, page: number) => {
        console.info(`Retrieving data... ("${term}", ${page})`);
        return term === 'no'
          ? of({ last: true, content: [], totalElements: 0 })
          : of({
              last: false,
              totalElements: 10000,
              content: Array.from({ length: 10 }, (_, i) => ({
                id: '' + (i + page * 10),
                firstName: 'John',
                lastName: `Doe (${i + page * 10})`,
                desc: `"${term}": page ${page}`
              }))
            }).pipe(delay(500));
      },
      render: (user: User) => ({
        label: `${user.firstName} ${user.lastName}`,
        description: user.desc
      })
    });
  }

  render() {
    return (
      <cat-select-remote
        label="Label"
        hint="This is a hint!"
        ref={el => (this.select = el)}
        value={['1']}
        placeholder="Hello World"
      ></cat-select-remote>
    );
  }
}
